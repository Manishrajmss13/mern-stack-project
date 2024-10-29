// utils/mailer.js

import axios from "axios";

export const sendEmail = async (toEmail, emailContent) => {
  try {
    console.log("Preparing to send email...");
    console.log("Recipient email:", toEmail);
    console.log("Email content:", emailContent);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.SENDER_EMAIL, name: "Salesify" },
        to: [{ email: toEmail }],
        subject: "Sales catch-up",
        htmlContent: `
          <html>
            <body>
              <p>${emailContent}</p> <!-- Explicitly define content as HTML -->
            </body>
          </html>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent successfully. Response data:", response.data);
    return response.data;
  } catch (error) {
    // If there's an error, log the details
    console.error("Error sending email:");
    console.error("Status:", error?.response?.status);
    console.error("Data:", error?.response?.data);
    console.error("Message:", error.message);
    throw error;
  }
};

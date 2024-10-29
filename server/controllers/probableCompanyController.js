import ProbableCompany from "../models/ProbableCompany.js";
import EmailStatus from "../models/EmailStatus.js";
import { scheduleEmail } from "../utils/scheduler.js";
import { generatePersonalizedEmailContent } from "../utils/personalizeEmail.js"; // Import helper to generate personalized email content

// Create a new probable company
export const createProbableCompany = async (req, res) => {
  try {
    const { companyName, headName, email, mobile } = req.body;

    // Create a new instance of ProbableCompany
    const newCompany = new ProbableCompany({
      companyName,
      headName,
      email,
      mobile,
    });

    // Save the new company to the database
    await newCompany.save();

    // Schedule the email to be sent in 30 seconds
    const scheduledTime = new Date(Date.now() + 30 * 1000); // 30 seconds later

    const emailStatus = new EmailStatus({
      companyId: newCompany._id,
      email,
      scheduledSendTime: scheduledTime,
      status: "pending" // Explicitly set to "pending" for clarity
    });
    await emailStatus.save();

    // Generate personalized email content
    const personalizedContent = await generatePersonalizedEmailContent(companyName, headName);

    // Schedule the email with dynamic content
    scheduleEmail(newCompany._id, email, scheduledTime, personalizedContent);

    res.status(201).json({
      message: "Probable company created and email scheduled successfully",
      newCompany,
    });
  } catch (error) {
    console.error("Error creating probable company and scheduling email:", error);
    res.status(500).json({ message: "Error creating probable company", error });
  }
};

// utils/scheduler.js

import cron from "node-cron";
import EmailStatus from "../models/EmailStatus.js";
import { sendEmail } from "./mailer.js";

// Schedule email for a specific time with dynamic content
export const scheduleEmail = (companyId, email, scheduledTime, emailContent) => {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    if (now >= scheduledTime) {
      try {
        const emailStatus = await EmailStatus.findOne({
          companyId,
          email,
          status: "pending",
        });

        if (emailStatus) {
          await sendEmail(email, emailContent); // Pass the content
          emailStatus.status = "sent";
          await emailStatus.save();
        }
      } catch (error) {
        console.error("Error in scheduled email task:", error);
      }
    }
  });
};

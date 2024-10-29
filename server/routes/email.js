// routes/email.js

import express from "express";
import EmailStatus from "../models/EmailStatus.js";

const router = express.Router();

// Endpoint to receive email events
router.post("/webhook", async (req, res) => {
  try {
    const { event, email } = req.body;

    // Update email status based on Brevo's event
    const emailStatus = await EmailStatus.findOne({ email });
    if (emailStatus) {
      if (event === "open") {
        emailStatus.status = "opened";
      } else if (event === "reply") {
        emailStatus.status = "replied";
      }
      await emailStatus.save();
    }

    res.status(200).json({ message: "Email event updated successfully" });
  } catch (error) {
    console.error("Error updating email event:", error);
    res.status(500).json({ message: "Error processing email event", error });
  }
});

export default router;

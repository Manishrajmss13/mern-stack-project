// routes/webhook.js

import express from "express";
import EmailStatus from "../models/EmailStatus.js";

const router = express.Router();

router.post("/webhook", async (req, res) => {
  const { event, email } = req.body;

  if (event === "reply") {
    try {
      const emailStatus = await EmailStatus.findOne({ email });
      if (emailStatus && !emailStatus.replied) {
        emailStatus.replied = true;
        emailStatus.status = "replied";
        await emailStatus.save();
      }
      res.sendStatus(200);
    } catch (error) {
      console.error("Error handling reply event:", error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});

export default router;

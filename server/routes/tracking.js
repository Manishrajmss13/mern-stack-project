// routes/tracking.js

import express from "express";
import EmailStatus from "../models/EmailStatus.js";

const router = express.Router();

router.get("/track-open/:id", async (req, res) => {
  try {
    const emailStatus = await EmailStatus.findById(req.params.id);
    if (emailStatus && !emailStatus.opened) {
      emailStatus.opened = true;
      emailStatus.status = "opened";
      await emailStatus.save();
    }
    res.sendStatus(200); // Send a blank 200 response
  } catch (error) {
    console.error("Error tracking email open:", error);
    res.sendStatus(500);
  }
});

export default router;

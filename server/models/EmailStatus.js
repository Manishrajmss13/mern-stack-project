// models/EmailStatus.js

import mongoose from "mongoose";

const EmailStatusSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProbableCompany",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "opened", "replied"],
      default: "pending",
    },
    scheduledSendTime: {
      type: Date,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    replied: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EmailStatus = mongoose.model("EmailStatus", EmailStatusSchema);
export default EmailStatus;

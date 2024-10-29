import mongoose from "mongoose";

const ProbableCompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    headName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      max: 15,
    },
  },
  { timestamps: true }
);

const ProbableCompany = mongoose.model("ProbableCompany", ProbableCompanySchema);
export default ProbableCompany;

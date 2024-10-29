
import Company from "../models/Company.js";

export const addCompany = async (req, res) => {
  const { companyName, email, phone, dateAdded } = req.body;
  
  try {
    const newCompany = new Company({
      companyName,
      email,
      phone,
      dateAdded,
    });
    await newCompany.save();
    res.status(201).json({ message: "Company added successfully" });
  } catch (error) {
    console.error("Error adding company:", error);
    res.status(500).json({ message: "Error adding company" });
  }
};

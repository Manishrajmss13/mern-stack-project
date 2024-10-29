import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import csv from "csv-parser";
import fs from "fs";
import nodemailer from "nodemailer";

// Helper function to generate a random password
const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8);
};

// Email setup for sending account details to employees
const sendAccountEmail = async (email, name, password) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Or your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your New Account",
    text: `Dear ${name},\n\nYour account has been created.\n\nYour login details:\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after logging in.\n\nThank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

// Add Employees from CSV
export const addEmployees = async (req, res) => {
  try {
    const results = [];
    const file = req.file.path; // Assumes you're using multer for file upload

    // Parse CSV file
    fs.createReadStream(file)
      .pipe(csv())
      .on("data", async (row) => {
        const { Name, Age, ContactNumber, Email } = row;
        const randomPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const newEmployee = new Employee({
          name: Name,
          age: Age,
          contactNumber: ContactNumber,
          email: Email,
          password: hashedPassword,
        });

        await newEmployee.save();

        // Send account email with generated password
        await sendAccountEmail(Email, Name, randomPassword);
        
        results.push(newEmployee);
      })
      .on("end", () => {
        res.status(200).json({ message: "Employees added successfully", data: results });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

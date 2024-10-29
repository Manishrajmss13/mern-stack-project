import express from "express";
import { createProbableCompany } from "../controllers/probableCompanyController.js"; // Import the new controller

const router = express.Router();


router.post("/", createProbableCompany); // Add the new route for creating a probable company


export default router;

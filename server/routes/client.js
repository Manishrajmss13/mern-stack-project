import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.js";
import multer from 'multer';
import { addEmployees } from "../controllers/employeeController.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);
router.post("/api/employee/addemployees", upload.single("file"), addEmployees);

export default router;








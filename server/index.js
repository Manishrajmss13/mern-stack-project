import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

import loginRoutes from "./routes/login.js";
import adminRoutes from "./routes/admin.js";
import catchRoutes from "./routes/catch.js";
import trackingRoutes from "./routes/tracking.js";
import webhookRoutes from "./routes/webhook.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes); // Client-related functionalities
app.use("/general", generalRoutes); // General functionalities
app.use("/management", managementRoutes); // Management-related functionalities
app.use("/sales", salesRoutes);
import probableCompanyRoutes from "./routes/probableCompany.js"; // Adjust the path as needed
app.use("/probable-company",probableCompanyRoutes);
 // Sales-related functionalities
 app.use("/track-open", trackingRoutes);
 app.use("/webhook", webhookRoutes);
app.use("/login", loginRoutes); // Login and authentication
app.use("/admin", adminRoutes); // Admin functionalities
app.use("/catch", catchRoutes); // Sales follow-ups and automation (if different from "sales")

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));

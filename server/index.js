import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import cartRoutes from "./routes/cart.js";
import userRoutes from "./routes/users.js";
import orderHistoryRoute from "./routes/orderHistory.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ imit: "30mb", extended: true }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "resources"))); //Access file in this folder
app.use("/products/uploads", productRoutes); //POST a product with images
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);
app.use("/orderhistory", orderHistoryRoute);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL)
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	.catch(error => console.log(error.message));

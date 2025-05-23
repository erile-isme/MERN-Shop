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
import favrotiesRoute from "./routes/favorites.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ imit: "30mb", extended: true }));
// CORS Configuration
app.use(
	cors({
		origin: [process.env.PROD_FRONTEND_API, process.env.LOCAL_FRONTEND_API],
		methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
		credentials: true,
	})
);
app.use(express.json());

//Health Check Point
app.get("/", (req, res) => {
	res.status(200).json("Backend is running!");
});
//Access file in this folder
app.use("/uploads", express.static(path.join(__dirname, "resources")));
//POST a product with images
app.use("/products/uploads", productRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);
app.use("/orderhistory", orderHistoryRoute);
app.use("/favorites", favrotiesRoute);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL)
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	.catch(error => console.log(error.message));

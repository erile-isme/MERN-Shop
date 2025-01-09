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
// CORS Configuration
const allowedOrigins = [
	process.env.LOCAL_FRONTEND_API,
	process.env.PROD_FRONTEND_API,
];
console.log("ALLOWED: ", allowedOrigins);
app.use(
	cors({
		origin: ["https://mern-shop-eri.vercel.app/"],
		methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
		credentials: true,
	})
);
app.use(express.json());

// app.use((req, res, next) => {
// 	const origin = req.headers.origin;
// 	console.log("ORIGIN: ", origin);

// 	if (!origin || allowedOrigins.includes(origin)) {
// 		console.log("START SETTING HEADERS");
// 		res.setHeader("Access-Control-Allow-Origin", origin || "*");
// 		res.setHeader(
// 			"Access-Control-Allow-Methods",
// 			"GET, POST, PUT, DELETE, OPTIONS"
// 		);
// 		res.setHeader(
// 			"Access-Control-Allow-Headers",
// 			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
// 		);
// 		res.setHeader("Access-Control-Allow-Credentials", "true");
// 	}

// 	if (req.method === "OPTIONS") {
// 		// Respond OK to preflight requests
// 		return res.sendStatus(204);
// 	}

// 	next();
// });
// app.options("*", cors());

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

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL)
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	.catch(error => console.log(error.message));

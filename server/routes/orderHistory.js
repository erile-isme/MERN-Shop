import express from "express";
import {
	addToOrderHistory,
	fetchAllOrderHistory,
	fetchLatestOrder,
	getOrderHistory,
} from "../controllers/orderHistory.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, fetchLatestOrder);
router.get("/all", protect, fetchAllOrderHistory);
router.get("/:id", protect, getOrderHistory);
router.post("/", protect, addToOrderHistory);

export default router;

import express from "express";
import {
	fetchCart,
	addItemToCart,
	removeItemFromCart,
	updateCartItem,
} from "../controllers/cart.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, fetchCart);
router.post("/", protect, addItemToCart);
router.patch("/", protect, updateCartItem);
router.patch("/delete", protect, removeItemFromCart);

export default router;

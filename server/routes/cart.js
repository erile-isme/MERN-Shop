import express from "express";
import {
	fetchCart,
	addItemToCart,
	removeItemFromCart,
	removeAllFromCart,
	updateCartItem,
} from "../controllers/cart.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, fetchCart);
router.post("/", protect, addItemToCart);
router.patch("/", protect, updateCartItem);
router.delete("/delete-all", protect, removeAllFromCart);
router.delete("/delete/:removedId", protect, removeItemFromCart);

export default router;

import express from "express";
import {
	fetchCart,
	addItemToCart,
	removeItemFromCart,
	updateCartItem,
} from "../controllers/cart.js";

const router = express.Router();

router.get("/", fetchCart);
router.post("/", addItemToCart);
router.patch("/", updateCartItem);
router.delete("/:id", removeItemFromCart);

export default router;

import express from "express";
import {
	fetchCart,
	addItemToCart,
	removeItemFromCart,
} from "../controllers/cart.js";

const router = express.Router();

router.get("/", fetchCart);
router.post("/", addItemToCart);
// router.get('/:id', getProduct);

export default router;

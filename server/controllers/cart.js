import mongoose from "mongoose";
import Cart from "../models/cartModel.js";

export const fetchCart = async (req, res) => {
	try {
		const cart = await Cart.find().populate("productId");
		console.log(cart[0].productId.name);
		res.status(200).json(cart);
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const addItemToCart = async (req, res) => {
	const cartItem = req.body;
	cartItem.productId = new mongoose.Types.ObjectId(cartItem.productId);

	console.log(cartItem);
	const newCartItem = new Cart(cartItem);

	try {
		await newCartItem.save();
		res.status(201).json(newCartItem);
	} catch (error) {
		res.status(409).json({ message: error });
	}
};

export const removeItemFromCart = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const product = await Product.findById(id);

	res.json(product);
};

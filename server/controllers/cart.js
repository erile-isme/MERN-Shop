import mongoose from "mongoose";
import Cart from "../models/cartModel.js";

export const fetchCart = async (req, res) => {
	try {
		const cart = await Cart.find().populate("productId");
		res.status(200).json(cart);
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const addItemToCart = async (req, res) => {
	const newItem = req.body;
	newItem.productId = new mongoose.Types.ObjectId(newItem.productId);

	try {
		const cartItem = await Cart.updateOne(
			{ productId: newItem.productId },
			{ $inc: { quantity: newItem.quantity } }
		);

		if (cartItem.modifiedCount === 0) {
			const item = new Cart(newItem);
			console.log(item);
			await item.save();
		}
		const cart = await Cart.find().populate("productId");

		res.status(201).json({
			message: `Cart item ${
				cartItem.modifiedCount === 0 ? "added" : "updated"
			} successfully`,
			cart,
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "An error occurred while updating the cart" });
	}
};

export const updateCartItem = async (req, res) => {
	const { productId, quantity, color, size } = req.body;
	let updatedItem = {};
	updatedItem.productId = new mongoose.Types.ObjectId(productId);

	if (quantity != undefined) updatedItem.quantity = quantity;
	if (color != undefined) updatedItem.color = color;
	if (size != undefined) updatedItem.size = size;

	try {
		const cartItem = await Cart.updateOne(
			{ productId: updatedItem.productId },
			{ $set: updatedItem }
		);

		if (cartItem.modifiedCount > 0) {
			const cart = await Cart.find().populate("productId");
			return res
				.status(200)
				.json({ message: "Cart item updated successfully", cart });
		} else {
			return res.status(400).json({ message: "No changes were made" });
		}
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "An error occurred while updating the cart" });
	}
};

export const removeItemFromCart = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	try {
		const cartItem = await Cart.findByIdAndDelete(id);
		if (!cartItem) return res.status(404).send(`Item with id ${id} not found`);
		res
			.status(200)
			.json({ message: "Item removed from cart successfully", cartItem });
	} catch (error) {
		console.error(error);
		res.status(500).send("Error removing the item from the cart");
	}
};

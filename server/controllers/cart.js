import mongoose from "mongoose";
import Cart from "../models/cartModel.js";

export const fetchCart = async (req, res) => {
	try {
		const cart = await Cart.find({
			user: req.user._id,
		});

		res.status(200).json({
			message: "Fetch cart successfully",
			userCart: cart,
		});
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const addItemToCart = async (req, res) => {
	const newItem = req.body;
	newItem.productId = new mongoose.Types.ObjectId(newItem.productId);
	let cartItem = null;

	try {
		// If cart doesn't exist, create a new cart and add the item
		cartItem = new Cart({
			user: req.user._id,
			quantity: newItem.quantity,
			color: newItem.color,
			size: newItem.size,
			name: newItem.name,
			price: newItem.price,
			img: newItem.img,
			productId: newItem.productId,
		});

		await cartItem.save();

		res.status(201).json({
			message: "Cart item added successfully",
			userCart: cartItem,
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

	try {
		const updatedItem = await Cart.findOneAndUpdate(
			{
				user: req.user._id,
				productId: new mongoose.Types.ObjectId(productId),
				size: size,
				color: color,
			},
			{
				$set: { quantity: quantity },
			},
			{
				new: true,
			}
		);

		res.status(200).json({
			message: "Cart item updated successfully",
			userCart: updatedItem,
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "An error occurred while updating the cart" });
	}
};

export const removeItemFromCart = async (req, res) => {
	const { productId, size, color } = req.body;
	const cartId = new mongoose.Types.ObjectId(productId);

	try {
		const removedItem = await Cart.findOneAndUpdate(
			{
				user: req.user._id,
				productId: cartId,
				size: size,
				color: color,
			},
			{
				$pull: {
					orderItems: { productId, size, color },
				},
			},
			{ new: true }
		);

		if (!removedItem)
			return res.status(404).send(`Item with id ${cartId} not found`);
		res.status(200).json({
			message: "Item removed from cart successfully",
			userCart: removedItem,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Error removing the item from the cart");
	}
};

export const removeAllFromCart = async (req, res) => {
	try {
		const result = await Cart.deleteMany({ user: req.user._id });
		res.status(200).json({
			message: `${result.deletedCount} item(s) removed from cart successfully`,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Error removing all of the items from the cart");
	}
};
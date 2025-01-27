import mongoose from "mongoose";
import Cart from "../models/cartModel.js";

export const fetchCart = async (req, res) => {
	try {
		const cart = await Cart.find({
			user: req.user._id,
		}).populate("categoryId", "name");

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

	try {
		const existingItem = await Cart.findOneAndUpdate(
			{
				user: req.user._id,
				productId: newItem.productId,
				size: newItem.size,
				color: newItem.color,
			},
			{
				$inc: { quantity: newItem.quantity },
			},
			{
				new: true,
			}
		);

		if (existingItem) {
			res.status(200).json({
				message: "Cart item added and updated successfully",
				userCart: existingItem,
			});
		} else {
			//If item doesn't exit in the cart
			const cartItem = new Cart({
				user: req.user._id,
				quantity: newItem.quantity,
				color: newItem.color,
				size: newItem.size,
				productId: newItem.productId,
				name: newItem.name,
				price: newItem.price,
				img: newItem.img,
				categoryId: newItem.categoryId,
			});

			await cartItem.save();

			res.status(201).json({
				message: "Cart item added successfully",
				userCart: cartItem,
			});
		}
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
				product: new mongoose.Types.ObjectId(productId),
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
	const { removedId } = req.body;
	const itemId = new mongoose.Types.ObjectId(removedId);

	try {
		const removedItem = await Cart.findByIdAndDelete(itemId);

		if (!removedItem)
			return res.status(404).send(`Item with id ${itemId} not found`);
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
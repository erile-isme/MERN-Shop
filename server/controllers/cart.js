import mongoose from "mongoose";
import Cart from "../models/cartModel.js";

export const fetchCart = async (req, res) => {
	let cartExist = null;
	try {
		const cart = await Cart.findOne({
			user: req.user._id,
		});
		console.log(cart);
		if (!cart) {
			cartExist = [];
		} else {
			cartExist = cart;
		}
		res.status(200).json({
			message: "Fetch cart successfully",
			cart: cartExist,
		});
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const addItemToCart = async (req, res) => {
	const newItem = req.body;
	newItem.productId = new mongoose.Types.ObjectId(newItem.productId);
	let cartItem = null;
	let productIdExists;

	try {
		const userExist = await Cart.findOne({
			user: req.user._id,
		});

		//If user exist in Cart table
		if (userExist) {
			// If cart exists, check if the item exists in the orderItems array
			let [productIdExists, sizeExists, colorExists] = [
				"productId",
				"size",
				"color",
			].map(key =>
				userExist.orderItems.some(item => {
					//If it's productId, compare .equals()
					if (
						mongoose.Types.ObjectId.isValid(item[key]) ||
						mongoose.Types.ObjectId.isValid(newItem[key])
					) {
						return newItem[key].equals(item[key]);
					}
					//Other type, compare ===
					return newItem[key] === item[key];
				})
			);

			if (productIdExists && sizeExists && colorExists) {
				// Item already exists in the cart, increment the quantity
				cartItem = await Cart.updateOne(
					{ user: req.user._id, "orderItems.productId": newItem.productId },
					{
						$inc: { "orderItems.$.quantity": newItem.quantity },
					}
				);
			} else {
				// Item doesn't exist or properties are not the same, add it to the orderItems array
				cartItem = await Cart.updateOne(
					{ user: req.user._id },
					{
						$push: {
							orderItems: {
								quantity: newItem.quantity,
								color: newItem.color,
								size: newItem.size,
								name: newItem.name,
								price: newItem.price,
								img: newItem.img,
								productId: newItem.productId,
							},
						},
					}
				);
			}
		} else {
			// If cart doesn't exist, create a new cart and add the item
			cartItem = new Cart({
				user: req.user._id,
				orderItems: [
					{
						quantity: newItem.quantity,
						color: newItem.color,
						size: newItem.size,
						name: newItem.name,
						price: newItem.price,
						img: newItem.img,
						productId: newItem.productId,
					},
				],
			});
			await cartItem.save();
		}
		const cart = await Cart.find();

		res.status(201).json({
			message: `Cart item ${
				productIdExists ? "added" : "updated"
			} successfully`,
			cart: cart ? cart[0] : cart,
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

	// console.log(productId);
	// console.log(quantity);
	// console.log(color);
	// console.log(size);
	// console.log(
	// 	await Cart.findOne({
	// 		user: req.user._id,
	// 		"orderItems.productId": updatedItem.productId,
	// 		"orderItems.productId": updatedItem.productId,
	// 		"orderItems.size": size,
	// 		"orderItems.color": color,
	// 	})
	// );
	try {
		const updatedItem = await Cart.updateOne(
			{
				user: req.user._id,
				"orderItems.productId": new mongoose.Types.ObjectId(productId),
				"orderItems.size": size,
				"orderItems.color": color,
			},
			{ $set: { "orderItems.$.quantity": quantity } },
			{ new: true }
		);
		console.log("UPDATE CART: ", updatedItem);

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
				"orderItems.productId": cartId,
				"orderItems.size": size,
				"orderItems.color": color,
			},
			{
				$pull: {
					orderItems: { productId, size, color },
				},
			},
			{ new: true }
		);

		console.log(removedItem);

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
		console.log(result);
		res.status(200).json({
			message: `${result.deletedCount} item(s) removed from cart successfully`,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Error removing all of the items from the cart");
	}
};
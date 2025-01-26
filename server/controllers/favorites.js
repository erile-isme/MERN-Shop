import mongoose from "mongoose";
import Favorites from "../models/favoritesModel.js";

export const getFavorites = async (req, res) => {
	try {
		const allfavorites = await Favorites.findOne({
			user: req.user._id,
		}).populate("favorites.product");
		console.log(allfavorites);

		res.status(200).json({
			message: "Fetch user favorites successfully",
			userFav: allfavorites,
		});
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const addOrRemoveFavorites = async (req, res) => {
	const { productId } = req.body;
	const productIdToModify = new mongoose.Types.ObjectId(productId);

	try {
		const existingUser = await Favorites.findOne({
			user: req.user._id,
		});

		//If user exists
		if (existingUser) {
			const existingFav = await Favorites.findOne({
				user: req.user._id,
				"favorites.product": productIdToModify,
			});

			console.log("EXISTING FAV: ", existingFav);
			//And already have this existing favorite -> remove it from the array
			if (existingFav) {
				const removedFav = await Favorites.findOneAndUpdate(
					{
						user: req.user._id,
					},
					{
						$pull: { favorites: { product: productIdToModify } },
					},
					{ new: true }
				);

				console.log("REMOVE FAV: ", removedFav);
				res.status(200).json({
					message: "Remove favorite successfully",
					removedFav: removedFav,
				});
			}
			//If item doesn't exist in this user, update and added to favorite array
			else {
				const addedFav = await Favorites.findOneAndUpdate(
					{
						user: req.user._id,
					},
					{
						$push: { favorites: { product: productIdToModify } },
					},
					{ new: true }
				);

				console.log("ADDED FAV: ", addedFav);
				res.status(201).json({
					message: "Added new favorite successfully",
					addedFav: addedFav,
				});
			}
		}
		//If user doesn't exist, create an entry for user's favorites
		else {
			const newUserFav = new Favorites({
				user: req.user._id,
				favorites: [
					{
						product: productIdToModify,
					},
				],
			});

			console.log("NEW FAV: ", newUserFav);

			await newUserFav.save();
			res.status(201).json({
				message: "Added new favorite successfully",
				newUserFav: newUserFav,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(409).json({ message: error });
	}
};

// export const findItemInFavorites

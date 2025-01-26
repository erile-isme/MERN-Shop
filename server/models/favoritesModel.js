import mongoose from "mongoose";

const favoritesSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
	favorites: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Product",
			},
		},
	],
});

export default mongoose.model("Favorites", favoritesSchema);

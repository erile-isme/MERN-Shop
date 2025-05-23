import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
	quantity: { type: Number, required: true },
	color: { type: String },
	size: { type: String },
	name: { type: String },
	price: { type: Number },
	img: { type: String },
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
});

export default mongoose.model("Cart", cartSchema);

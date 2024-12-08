import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: { type: Number, required: true },
	color: { type: String },
	size: { type: String },
});

export default mongoose.model("Cart", cartSchema);

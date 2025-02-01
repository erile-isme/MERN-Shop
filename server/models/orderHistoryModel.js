import mongoose from "mongoose";

const orderHistorySchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
	dateOfOrder: { type: String },
	orderNumber: { type: String, unique: true },
	orderStatus: { type: String, required: true },
	shippingMethod: { type: String, required: true },
	storeLocation: { type: String },
	deliveredBy: { type: String },
	orderItems: [
		{
			quantity: { type: Number },
			color: { type: String },
			size: { type: String },
			name: { type: String },
			price: { type: Number },
			img: { type: String },
			productId: { type: String },
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Product",
			},
		},
	],
	paymentOption: { type: String, required: true },
	totalBeforeTax: { type: Number, required: true },
	tax: { type: Number, required: true },
	coupon: { type: Number },
	shippingFee: { type: Number },
	orderTotal: { type: Number, required: true },
});

export default mongoose.model(
	"OrderHistory",
	orderHistorySchema,
	"orderHistory"
);

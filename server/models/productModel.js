import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	description: {
		features: { type: String },
		details: { type: String },
		materials: { type: String },
	},
	color: { type: [String] },
	colorName: { type: [String] },
	numInStock: { type: Number, required: true },
	img: { type: [String], required: true },
	size: { type: [String] },
	rating: { type: Number },
	isSlider: { type: Boolean },
	reviews: [
		{
			comment: { type: String, required: true },
			rating: { type: Number, required: true },
			timestamp: { type: Date },
			product: {
				color: { type: String },
				type: { type: String },
			},
			user: { type: String, required: true },
		},
	],
});

export default mongoose.model('Product', productSchema);

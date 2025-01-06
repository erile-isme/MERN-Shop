import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	address: { type: String, required: true },
	postalCode: { type: String },
	phone: { type: Number, required: true },
	termAgreement: { type: Boolean, required: true },
});

export default mongoose.model("User", userSchema);

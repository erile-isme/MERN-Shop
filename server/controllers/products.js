import mongoose from "mongoose";
import multer from "multer";
import Product from "../models/productModel.js";

const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, "resources/");
		},
		filename: (req, file, cb) => {
			cb(null, `${Date.now()}-${file.originalname}`);
		},
	}),
});

export const fetchAllProducts = async (req, res) => {
	try {
		const product = await Product.find();
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const uploadImage = upload.array("img", 4);

export const createProduct = async (req, res) => {
	const product = req.body;

	const imagePaths = req.files.map(file => file.path);
	product.img = imagePaths;

	const newProduct = new Product(product);
	try {
		await newProduct.save();
		res.status(201).json(newProduct);
	} catch (error) {
		res.status(409).json({ message: error });
	}
};

export const getProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const product = await Product.findById(id);

	res.json(product);
};

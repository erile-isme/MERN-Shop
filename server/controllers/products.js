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
		const product = await Product.find().populate("category");
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const fetchProductsInCategory = async (req, res) => {
	const { cateId } = req.params;
	const parsedCateId = new mongoose.Types.ObjectId(cateId);

	if (!mongoose.Types.ObjectId.isValid(parsedCateId))
		return res.status(404).send(`No post with id: ${parsedCateId}`);

	console.log(parsedCateId);
	try {
		const product = await Product.find({ category: parsedCateId }).populate(
			"category"
		);
		console.log(product);
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const fetchSlider = async (req, res) => {
	try {
		const products = await Product.find({ isSlider: true });

		if (products.length === 0) {
			return res
				.status(404)
				.json({ message: "No products found for the slider." });
		}

		res.status(200).json(products);
	} catch (error) {
		console.error("Error fetching slider products:", error);
		res
			.status(500)
			.json({ message: "Server error while fetching slider products." });
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

	const product = await Product.findById(id).populate("category");

	res.status(200).json(product);
};

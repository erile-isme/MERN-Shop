import mongoose from "mongoose";
import multer from "multer";
import Product from "../models/productModel.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey,
	},
	region: bucketRegion,
});

/* Upload to disk */
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "resources/");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, `${Date.now()}-${file.originalname}`);
// 	},
// });
// export const upload = multer({
// 	storage,
// 	limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
// 	fileFilter: (req, file, cb) => {
// 		if (
// 			file.mimetype == "image/png" ||
// 			file.mimetype == "image/jpg" ||
// 			file.mimetype == "image/jpeg"
// 		) {
// 			cb(null, true);
// 		} else {
// 			cb(null, false);
// 			const err = new Error("Only .png, .jpg and .jpeg format allowed!");
// 			err.name = "ExtensionError";
// 			return cb(err);
// 		}
// 	},
// }).array("image", 6);

/* Upload to memory buffer storage */
const storage = multer.memoryStorage();
export const upload = multer({ storage }).array("image", 6);

export const uploadPhotos = async (req, res) => {
	if (!req.files || req.files.length === 0) {
		return res.status(400).send("No files uploaded");
	}
	try {
		await req.files.map(file => {
			const params = {
				Bucket: bucketName,
				Key: `${Date.now()}-${file.originalname}`, //Filename
				Body: file.buffer,
				ContentType: file.mimetype,
			};

			const command = new PutObjectCommand(params);
			console.log(command);
			s3.send(command);
		});
	} catch (error) {
		console.log(error);
	}
};

export const fetchAllProducts = async (req, res) => {
	try {
		const products = await Product.find().populate("category");

		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const fetchProductsInCategory = async (req, res) => {
	const { cateId } = req.params;
	const parsedCateId = new mongoose.Types.ObjectId(cateId);

	if (!mongoose.Types.ObjectId.isValid(parsedCateId))
		return res.status(404).send(`No post with id: ${parsedCateId}`);

	try {
		const product = await Product.find({ category: parsedCateId }).populate(
			"category",
			"name"
		);

		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ message: error });
	}
};

export const fetchSlider = async (req, res) => {
	try {
		const products = await Product.find({ isSlider: true }).populate(
			"category",
			"name"
		);

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

export const findProduct = async (req, res) => {
	const { name } = req.query;

	if (!name) {
		return res.status(400).json({ message: "Search term required" });
	}

	try {
		const products = await Product.find({
			name: { $regex: name, $options: "i" },
		}).populate("category", "name");
		console.log(products);

		res.json(products);
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

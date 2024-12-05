import express from 'express';
import {
	fetchAllProducts,
	uploadImage,
	createProduct,
	getProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", fetchAllProducts);
router.post("/uploads", uploadImage, createProduct);
router.get('/:id', getProduct);
// router.post('/:category', getCategory);

export default router;

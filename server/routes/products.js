import express from 'express';
import {
	fetchAllProducts,
	fetchProductsInCategory,
	uploadImage,
	createProduct,
	getProduct,
	fetchSlider,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", fetchAllProducts);
router.post("/uploads", uploadImage, createProduct);
router.get("/slider", fetchSlider);
router.get("/:id", getProduct);
router.get("/categories/:cateId", fetchProductsInCategory);

// router.post('/:category', getCategory);

export default router;

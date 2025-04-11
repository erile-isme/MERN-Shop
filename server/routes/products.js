import express from 'express';
import {
	fetchAllProducts,
	fetchProductsInCategory,
	upload,
	createProduct,
	getProduct,
	findProduct,
	fetchSlider,
	uploadPhotos,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", fetchAllProducts);
router.post("/uploads-multi", upload, uploadPhotos);
router.post("/uploads", upload, createProduct);
router.get("/slider", fetchSlider);
router.get("/search", findProduct);
router.get("/:id", getProduct);
router.get("/categories/:cateId", fetchProductsInCategory);

export default router;

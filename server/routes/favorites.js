import express from "express";
import {
	getFavorites,
	addOrRemoveFavorites,
} from "../controllers/favorites.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getFavorites);
router.post("/", protect, addOrRemoveFavorites);

export default router;

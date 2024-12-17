import express from "express";
import protect from "../middleware/authMiddleware.js";
import { loginUser, registerUser, getMe } from "../controllers/users.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", protect, getMe);

export default router;

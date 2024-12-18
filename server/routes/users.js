import express from "express";
import protect from "../middleware/authMiddleware.js";
import { loginUser, registerUser, getUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", protect, getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;

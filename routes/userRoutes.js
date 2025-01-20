import express from "express";
import User from "../models/usersModel.js";
import { getAllUsers } from "../controllers/userController.js";
import { signIn, signup, protect } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", signIn);
router.post("/protect", protect);

router.get("/getAllUsers", getAllUsers);

export default router;

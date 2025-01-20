import express from "express";
import userRouter from "./userRoutes.js";
import productRouter from "./productRoutes.js";

const router = express.Router();
router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;

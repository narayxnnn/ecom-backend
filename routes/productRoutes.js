import express from "express";
import {
  addProduct,
  getAll,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProduct,
} from "../controllers/productController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getProduct);

// should be authorised

router.use(protect);

router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);
export default router;

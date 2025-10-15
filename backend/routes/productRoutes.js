import express from "express";
import { protect, admin } from '../middleware/authMiddleware.js'

import {
  getProducts,
  getProductById,
  createProduct,
  updateProducts,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

//-> prefix is /api/products
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);// if put below /:id then it will consider top as id parameter and will not work
router.route("/:id").get(getProductById).put(updateProducts).delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReview);

export default router;

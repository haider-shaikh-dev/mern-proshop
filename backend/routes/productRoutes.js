import express from "express";
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'
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
router.route("/:id").get(checkObjectId, getProductById).put(protect, admin, checkObjectId, updateProducts).delete(protect, checkObjectId, admin, deleteProduct);
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

export default router;

import express from "express";
import { protect, admin } from '../middleware/authMiddleware.js'

import {
  getProducts,
  getProductById,
  createProduct,
  updateProducts,
  deleteProduct,
} from "../controllers/productController.js";

//-> prefix is /api/products
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProductById).put(updateProducts).delete(protect, admin, deleteProduct);


export default router;

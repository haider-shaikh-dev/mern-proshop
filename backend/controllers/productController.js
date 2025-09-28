import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc get All Products
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  // throw new Error("Product not found!");
  const products = await Product.find({});
  res.json(products);
});

// @desc get single Product by Id
// @route GET /api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

export { getProducts, getProductById };

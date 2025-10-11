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

// @desc Create a Product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: 'image/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample Category',
    countInStock: 10,
    numReviews: 0,
    description: 'Sample description',

  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);

});

// @desc update a Products
// @route PUT /api/products/:id
// @access private/admin
const updateProducts = asyncHandler(async (req, res) => {

  const { name, price, image, brand, category, countInStock, description } = req.body;

  const product = await Product.findById(req.body.productId);
  console.log('product to be updated', product);

  if (product) {

    product.name = name;
    product.price = price;
    product.image = '/images/sample.jpg',
      product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404)
    throw new Error('Resource not found');
  }
});

export { getProducts, getProductById, createProduct, updateProducts };

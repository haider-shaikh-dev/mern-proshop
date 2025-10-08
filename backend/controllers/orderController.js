import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc create new order
// @route POST /api/orders
// @access privare
const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      shippingPrice,
      paymentMethod,
      itemPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc get Logged in user Orders
// @route GET /api/orders/mine
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {

  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    res.status(404);
    throw new Error("No orders found for this user");
  }
  res.status(201).json(orders);
});

// @desc get Order by Id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  // populate will add name and email from user collection as its id is referenced in orders model
  const orders = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error(" Order not found");
  }
});

// @desc update orders to paid
// @route PUT /api/orders/:id/pay
// @access Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };

    const updatedOrder = order.save();

    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Error while updating order");
    }
  } else {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json("update order to paid");
});

// @desc update orders to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/ Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.json("update order to delivered");
});

// @desc Get All Orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", 'id name')
  // res.json("get all Orders");
   if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error(" Orders not found");
  }
});

export {
  getOrderById,
  getOrders,
  getMyOrders,
  addOrderItem,
  updateOrderToDelivered,
  updateOrderToPaid,
};

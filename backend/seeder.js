import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data imported!".green.inverse);
    process.exit(); //just exiting not killing the process
  } catch (err) {
    console.log(`Error while seeding data ${err.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(`Data destroyed successfully`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Data destroyed error ${error.message}`.red.inverse);
    process.exit(1);
  }
};
// console.log(process.argv[2]);

if (process.argv[2] === "-d") {
  destroyData();
} else if (process.argv[2] === "-i") {
  importData();
} else {
  console.log(
    "no arguments passed for seeder file, pass either -i to import or -d for delete"
  );
}

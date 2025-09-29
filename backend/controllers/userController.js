import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken.js";

// @desc Auth Users & token
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Email oe Password is incorrect!");
  }
});

// @desc Register User
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isExistingUser = await User.findOne({ email });

  if (isExistingUser) {
    // console.log("isExistingUser", isExistingUser);

    res
      .status(400)
      .json("User Already exists, use different email for registration!");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
   res.status(400).json("Invalid User Data!");
  }
});

// @desc Lougout User / clear cookies
// @route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json("loggedout successfully");
});

// @desc Get User Profile
// @route POST /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
const user = await User.findById(req.user._id);

if(user){
   return res.status(201).json({
     _id: user._id,
     name: user.name,
     email: user.email,
     isAdmin: user.isAdmin,
   });
}else{
  res.json("NO user found for profile display!");
  
}

});

// @desc Update User Profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // const { name } = req.body;


    // const updatedUser = await User.updateOne(
    //   { _id: req.user._id },
    //   { name: name }
    // );

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password){
      user.password = req.body.password;
    }

    const updatedUser = await user.save();


    return res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json("No user found for profile display!");
  }

  res.json("update user profile");
});

// @desc Get Users
// @route PUT /api/users/
// @access private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.json("update user profile");
});

// @desc Delete Users
// @route Delete /api/users/profile
// @access private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.json("delete user");
});

// @desc Get User by ID
// @route PUGETT /api/users/:id
// @access private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.json("get user by id");
});

// @desc Update Users
// @route PUT /api/users/:id
// @access private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.json("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};

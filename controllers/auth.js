const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { request, response, json } = require("express");

dotenv.config();

exports.fetchUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).populate("role");
    res.json({
      allUsers,
    });
  } catch (error) {
    console.log("Error when fetching User data ", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};

exports.editUser = async (req, res) => {
  console.log("req.params.id", req.params.id, "req.body", req.body);
  const { username, email, password, role } = req.body;
  try {
    console.log(username, email, password, role, "update user from the server");
    User.findByIdAndDelete;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { username, email, password, role } },
      { new: true }
    ).select("-password");
    updatedUser
      .save()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json({ error: "field to update user" });
      });
  } catch (error) {
    res.json({ message: error.message });
  }

  User.findById({ _id: req.params.id }).then((data) => {
    console.log(data);
  });
};

exports.deleteUser = async (req, res) => {
  console.log("req.params.id", req.params.id, "req.body", req.body);
  const { username, email, password, role } = req.body;
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: req.params.id });
    return res
      .status(200)
      .json({ successMessage: "user's deleted", deletedUser });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log("body: ", req.body);
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email is already exist",
      });
    }
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.role = role;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    res.json({
      successMessage: "Register Successfully..",
    });
  } catch (error) {
    console.log("Server Error while creating new user", error);
    res.status(500).json({
      errorMessage: "Server Error while creating new user",
    });
  }
};

exports.readUser = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId);
    res.json({
      user,
    });
  } catch (error) {
    console.log("Error when fetching User data ", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};
const Product = require("../models/Product.js");
const fs = require("fs");

exports.create = async (req, res) => {
  const { filename } = req.file;
  const { productName, productPrice, productDesc, productQty } = req.body;

  try {
    let product = new Product();
    product.fileName = filename;
    product.productName = productName;
    product.productPrice = productPrice;
    product.productDesc = productDesc;
    product.productQty = productQty;

    await product.save();
    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log("Error when creating product", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json({ products });
  } catch (error) {
    console.log("Error when fetching product", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};

exports.read = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    res.json(product);
  } catch (err) {
    console.log(err, "read user error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.update = async (req, res) => {
  const productId = req.params.productId;

  if (req.file.filename) {
    req.body.fileName = req.file.filename;
    const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

    fs.unlink(`uploads/${oldProduct.fileName}`, (err) => {
      if (err) throw err;
      console.log("Image successfully deleted from the filesystem");
    });
    res.json(oldProduct);
  } else {
    const response = await Product.findByIdAndUpdate(productId, req.body);
    res.json(response);
  }
};

exports.delete = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deleteProduct = await Product.findByIdAndDelete(productId);

    fs.unlink(`uploads/${deleteProduct.fileName}`, (err) => {
      if (err) throw err;
      console.log("When while delete images", deleteProduct.fileName);
      res.json(deleteProduct);
    });
  } catch (error) {
    console.log("Error when delete product", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};
exports.editRole = async (req, res) => {
  console.log("req.params.id", req.params.roleId, "req.body", req.body);
  const { role, permissions } = req.body;

  try {
    const updatedRole = await Roles.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { role, permissions } },
      { new: true }
    );
    updatedRole
      .save()
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((err) => {
        return res.status(500).json({ error: "field to update role" });
      });
  } catch (error) {
    res.json({ message: error.message });
  }

  Roles.findById({ _id: req.params.roleId }).then((data) => {
    console.log(data);
  });
};

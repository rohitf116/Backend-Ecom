"use strict";
const Product = require("../model/ProductModel");

const { isValid, isValidObjectId } = require("../utils/regex");
const products = require("../products");

exports.createProduct = async (req, res) => {
  try {
    const { name, image, description, brand, category, price, countInStock } =
      req.body;
    if (!isValid(name)) {
      return res
        .status(400)
        .json({ status: false, message: "Name cannot be empty" });
    }
    if (!isValid(image)) {
      return res
        .status(400)
        .json({ status: false, message: "image cannot be empty" });
    }
    if (!isValid(description)) {
      return res
        .status(400)
        .json({ status: false, message: "description cannot be empty" });
    }
    if (!isValid(brand)) {
      return res
        .status(400)
        .json({ status: false, message: "brand cannot be empty" });
    }
    if (!isValid(category)) {
      return res
        .status(400)
        .json({ status: false, message: "Name cannot be empty" });
    }
    if (!isValid(price)) {
      return res
        .status(400)
        .json({ status: false, message: "price cannot be empty" });
    }
    if (isNaN(price)) {
      return res
        .status(400)
        .json({ status: false, message: "price must be a number" });
    }

    //count

    if (countInStock && isNaN(countInStock)) {
      return res
        .status(400)
        .json({ status: false, message: "countInStock must be a number" });
    }
    const producrCreated = await Product.create({
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
    });
    res.status(201).json({
      status: true,
      message: "Product is successfully created",
      data: producrCreated,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server Error", error: error.message });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const foundData = await Product.find();
    res.status(200).json({
      status: true,
      message: "Succesfully fetched",
      numOfItems: foundData.length,
      data: foundData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server Error", error: error });
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid object id" });
    }
    const foundProduct = await Product.findOne({ _id: id });
    if (!foundProduct) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }
    res.status(200).json({
      status: true,
      message: "Productdetails fetched",
      data: foundProduct,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server Error", error: error });
  }
};

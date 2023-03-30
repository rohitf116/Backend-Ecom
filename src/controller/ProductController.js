"use strict";
const Product = require("../model/ProductModel");

const { isValid } = require("../utils/regex");
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

const feedData = async (arr) => {
  let i = 0;
  while (i < arr.length) {
    const { name, image, description, brand, category, price, countInStock } =
      arr[i];
    const producrCreated = await Product.create({
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
      rating,
      numReviews,
    });
    console.log(producrCreated);
    i++;
  }
};
exports.getAllProduct = async (req, res) => {
  try {
    const foundData = await Product.find();
    await feedData(products);
    res
      .status(200)
      .json({ status: true, message: "Succesfully fetched", data: foundData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server Error", error: error.message });
  }
};

// console.log(products);

"use strict";
const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProductDetails,
} = require("../controller/ProductController");
const router = express.Router();

router.post("/", createProduct).get("/", getAllProduct);
router.get("/:id", getProductDetails);

module.exports = router;

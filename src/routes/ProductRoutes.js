"use strict";
const express = require("express");
const {
  createProduct,
  getAllProduct,
} = require("../controller/ProductController");
const router = express.Router();

router.post("/", createProduct).get("/", getAllProduct);

module.exports = router;

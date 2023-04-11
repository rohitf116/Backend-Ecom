"use strict";
const express = require("express");
const { createCart, removeFromCart } = require("../controller/CartContoller");
const router = express.Router();

router.post("/", createCart).put("/", removeFromCart);
// router.get("/:id", getProductDetails);

module.exports = router;

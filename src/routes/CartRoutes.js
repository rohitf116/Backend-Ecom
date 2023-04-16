"use strict";
const express = require("express");
const {
  createCart,
  removeFromCart,
  getCartDetails,
} = require("../controller/CartContoller");
const { isAuth } = require("../middleware/isAuth");
const router = express.Router();

router
  .post("/", isAuth, createCart)
  .put("/", isAuth, removeFromCart)
  .get("/", isAuth, getCartDetails);
// router.get("/:id", getProductDetails);

module.exports = router;

"use strict";
const express = require("express");
const {
  createUser,
  login,
  verifyEmailOtp,
  regenerateEmailOTP,
} = require("../controller/UserController");
const router = express.Router();

router.post("/", createUser);
router.post("/login", login);
router.post("/verify", verifyEmailOtp);
router.patch("/resent", regenerateEmailOTP);
// router.get("/:id", getProductDetails);

module.exports = router;

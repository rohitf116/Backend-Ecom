"use strict";
const express = require("express");
const {
  createUser,
  login,
  verifyEmailOtp,
  regenerateEmailOTP,
  getUser,
  deleteUser,
  updateUser,
  changePassword,
  addAddress,
  getAddress,
  updateAddress,
} = require("../controller/UserController");
const { isAuth } = require("../middleware/isAuth");
const { routeNotfound } = require("../middleware/notFound");
const router = express.Router();

router
  .post("/", createUser)
  .get("/", isAuth, getUser)
  .delete("/", isAuth, deleteUser)
  .patch("/", isAuth, updateUser)
  .put("/", changePassword);
router.post("/login", login);
router.post("/verify", verifyEmailOtp);
router.patch("/resent", regenerateEmailOTP);
router
  .post("/address", isAuth, addAddress)
  .get("/address", isAuth, getAddress)
  .put("/address", isAuth, updateAddress);
// router.get("/:id", getProductDetails);
router.use("*", routeNotfound);

module.exports = router;

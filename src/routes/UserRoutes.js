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
// router.get("/:id", getProductDetails);
router.use("*", routeNotfound);

module.exports = router;

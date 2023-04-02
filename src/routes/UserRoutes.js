"use strict";
const express = require("express");
const { createUser } = require("../controller/UserController");
const router = express.Router();

router.post("/", createUser);
// router.get("/:id", getProductDetails);

module.exports = router;

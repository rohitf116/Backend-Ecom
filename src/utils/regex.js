"use strict";
const mongoose = require("mongoose");
exports.isValid = (str) => {
  if (!str) return false;
  if (typeof str === "string" && str.length === 0) return false;
  return true;
};

exports.isValidObjectId = (ObjectId) => {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

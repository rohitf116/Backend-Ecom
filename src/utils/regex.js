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
exports.isValidEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
  return false;
};

exports.isValidPhone = (mobile) => {
  if (/^([9876]{1})(\d{1})(\d{8})$/.test(mobile)) return true;
  return false;
};

exports.isValidPassword = (pw) => {
  if (/^.{8,15}$/.test(pw)) return true;
  return false;
};

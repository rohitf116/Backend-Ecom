"use strict";
exports.isValid = (str) => {
  if (!str) return false;
  if (typeof str === "string" && str.length === 0) return false;
  return true;
};

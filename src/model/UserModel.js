"use strict";

const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        required: true,
        unique: true,
      },
    },
    otp: {
      email: {
        value: { type: String, default: null },
        expiry: Date,
      },
    },
    tokenVersion: {
      type: Number,
      default: 1,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDeleted: { type: Boolean, default: false },
    cart: { type: ObjectId, ref: "Cart" },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);

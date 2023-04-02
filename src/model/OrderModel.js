"use strict";

const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const OrderSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },

    items: [
      {
        productId: { type: ObjectId, refs: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],

    totalPrice: { type: Number, required: true },

    totalItems: { type: Number, required: true },

    totalQuantity: { type: Number, required: true },

    cancellable: { type: Boolean, default: true },

    paymentMethod: {
      type: String,
      required: true,
    },
    paymntResult: {
      id: { type: String },
      status: {
        type: String,
        default: "pending",
        enum: ["pending", "completed", "cancelled"],
      },
      update_time: String,
      email_address: String,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelevered: {
      type: Boolean,
      default: false,
    },
    deleveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema);

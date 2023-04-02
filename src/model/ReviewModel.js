"use strict";

const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Review", ReviewSchema);

const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;
const cartSchema = new Schema(
  {
    userId: { type: ObjectId, ref: "User", unique: true, required: true },
    items: [
      {
        quantity: { type: Number, min: 1 },
        productId: { type: ObjectId, ref: "Product" },
        name: String,
        price: Number,
        image: String,
        countInStock: Number,
      },
    ],
    totalPrice: { type: Number, required: true },
    totalItems: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("Cart", cartSchema);

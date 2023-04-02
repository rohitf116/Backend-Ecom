const Cart = require("../model/CartModel");
const Product = require("../model/ProductModel");
const User = require("../model/UserModel");
const { isValid, isValidObjectId } = require("../utils/regex");

exports.createCart = async (req, res) => {
  try {
    const userId = req?.user?._id || "64296ff269b4af7ec7a14e64";
    const foundUser = await User.findOne({ _id: userId });
    console.log(foundUser);
    if (!foundUser) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }
    const { id, qty } = req.body;
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid object id" });
    }
    if (qty && isNaN(qty)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid quantity" });
    }
    const foundProduct = await Product.findOne({ _id: id });
    if (!foundProduct) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    const foundCart = await Cart.findOne({ _id: foundUser.cart });
    console.log(foundCart);
    if (foundCart) {
      const isItemExsit = foundCart.items.find(
        (ele) => ele.productId.toString() === id
      );
      if (isItemExsit) {
        isItemExsit.quantity += qty;
        foundCart.totalPrice += foundProduct.price * qty;
        foundCart.totalItems += qty;
      } else {
        foundCart.items.push({ quantity: qty, productId: id });
        foundCart.totalPrice += foundProduct.price * qty;
        foundCart.totalItems += qty;
      }

      await foundCart.save();
      return res.status(200).json({
        status: true,
        message: "Product seccessfully added to cart",
        data: foundCart,
      });
    }
    const items = [{ quantity: qty, productId: id }];

    const createdCart = await Cart.create({
      userId,
      items,
      totalPrice: foundProduct.price * qty,
      totalItems: qty,
    });
    foundUser.cart = createdCart._id;
    await foundUser.save();
    res.status(201).json({
      status: true,
      message: "Cart successfull created",
      data: createdCart,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server Error", error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req?.user?._id || "64296ff269b4af7ec7a14e64";
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }
    const { id, qty } = req.body;
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid object id" });
    }
    if (qty && isNaN(qty)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid quantity" });
    }
    const foundProduct = await Product.findOne({ _id: id });
    if (!foundProduct) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }
    const foundCart = await Cart.findOne({ _id: foundUser?.cart });
    if (!foundCart) {
      return res.status(404).json({ status: false, message: "Cart not found" });
    }
    const isItemExsit = foundCart.items.find(
      (ele) => ele.productId.toString() === id
    );
    if (!isItemExsit) {
      return res
        .status(404)
        .json({ status: false, message: "This product does not exist here" });
    }
    if (qty > isItemExsit) {
      return res.status(404).json({
        status: false,
        message: "You cannot remove more items than you have",
      });
    }
    isItemExsit.quantity -= qty;
    if (isItemExsit.quantity === 0) {
      foundCart.items = foundCart.items.filter(
        (item) => item.productId.toString() !== id
      );
    } else {
      // This line is needed if you want to update the cart with the modified item
      foundCart.items = foundCart.items.map((item) =>
        item.productId.toString() === id ? isItemExsit : item
      );
    }
    foundCart.totalItems -= qty;
    foundCart.totalPrice -= foundProduct.price * qty;
    await foundCart.save();
    res.status(200).json({
      status: true,
      message: "Product succesfully removed",
      data: foundCart,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server Error", error: error.message });
  }
};

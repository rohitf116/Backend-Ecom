const User = require("../model/UserModel");
const { isValid, isValidObjectId } = require("../utils/regex");
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!isValid(name)) {
      return res
        .status(400)
        .json({ status: false, message: "Name cannot be empty" });
    }
    if (!isValid(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Name cannot be empty" });
    }
    if (!isValid(password)) {
      return res
        .status(400)
        .json({ status: false, message: "Name cannot be empty" });
    }
    const createdUser = await User.create({ name, email, password });
    res
      .status(201)
      .json({
        status: true,
        message: "Succesfully created user",
        data: createdUser,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server Error", error: error.message });
  }
};

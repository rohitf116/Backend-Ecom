const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { generateExpiry, generateOTP } = require("./calculation");
dotenv.config();
const secret = process.env.SECRET;
exports.hashPassword = async (password) => await bcrypt.hash(password, 10);
exports.verifyHashedPassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

exports.generateAndHashOTP = async (oneTimePassword) => {
  const stringOTP = String(oneTimePassword);
  const hashedOTP = await bcrypt.hash(stringOTP, 10);
  let otp = { email: { value: hashedOTP, expiry: generateExpiry() } };

  return otp;
};

exports.generateJWT = (user) => {
  return (token = jwt.sign(
    { id: user._id, version: user.tokenVersion, isAdmin: user.isAdmin },
    secret + user.tokenVersion,
    { expiresIn: "1D" }
  ));
};

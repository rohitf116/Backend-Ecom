const bcrypt = require("bcrypt");
const { generateExpiry, generateOTP } = require("./calculation");
exports.hashPassword = async (password) => await bcrypt.hash(password, 10);
exports.verifyHashedPassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

exports.generateAndHashOTP = async (oneTimePassword) => {
  const stringOTP = String(oneTimePassword);
  const hashedOTP = await bcrypt.hash(stringOTP, 10);
  let otp = { email: { value: hashedOTP, expiry: generateExpiry() } };

  return otp;
};

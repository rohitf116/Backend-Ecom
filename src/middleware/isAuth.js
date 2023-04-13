const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const secret = process.env.SECRET;

exports.isAuth = async (req, res, next) => {
  try {
    const { LOGIN_HASH } = req.cookies;
    if (!LOGIN_HASH) {
      res.status(401).json({ status: false, message: "Please login" });
    }
    const decoded = jwt.decode(LOGIN_HASH);
    jwt.verify(LOGIN_HASH, secret + decoded.version || 0, (error, response) => {
      if (error) {
        return res
          .status(401)
          .json({ status: false, message: "Invalid tokens" });
      }
      req.user = response;
      next();
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server Error", error: error.message });
  }
};

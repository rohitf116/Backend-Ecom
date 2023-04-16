const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const secret = process.env.SECRET;

exports.isAuth = async (req, res, next) => {
  try {
    const { LOGIN_HASH } = req.cookies;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ status: false, message: "Please login" });
    }
    const tokennWithout = token.split(" ")[1];

    const decoded = jwt.decode(tokennWithout);

    if (!tokennWithout || isNaN(decoded?.version)) {
      return res.status(401).json({
        status: false,
        message: "token should start with Bearer and token should be valud",
      });
    }
    jwt.verify(
      tokennWithout,
      secret + decoded.version || 0,
      (error, response) => {
        if (error) {
          return res
            .status(401)
            .json({ status: false, message: "Invalid tokens" });
        }
        req.user = response;
        next();
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server Error", error: error.message });
  }
};

const { HttpCode } = require("./constants");
const jwt = require("jsonwebtoken-refresh");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const guard = async (req, res, next) => {
  try {
    const token = req.session.token;
    if (!token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: "Session doesn't exist",
      });
    }

    jwt.verify(token, JWT_SECRET);
    const originalDecoded = jwt.decode(token, { complete: true });
    const refreshed = jwt.refresh(originalDecoded, "7d", JWT_SECRET);
    req.session.token = refreshed;
    req.user = originalDecoded.payload
    return next();
  } catch (error) {
    console.log(error);
    req.session.token = null;
    return res.status(HttpCode.UNAUTHORIZED).json({
      message: "Session expired",
    });
  }
};

module.exports = guard;
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_CODES } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(ERROR_CODES.UNAUTH_ERROR)
      .send({ message: ERROR_CODES.UNAUTH_ERROR_MESSAGE });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(ERROR_CODES.UNAUTH_ERROR)
      .send({ message: ERROR_CODES.UNAUTH_ERROR_MESSAGE });
  }

  req.user = payload;
  return next();
};

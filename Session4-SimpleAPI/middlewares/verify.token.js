const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");
const appErrors = require("../utils/appErrors");
const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    const error = appErrors.create(
      "token is required!",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("currentUser", currentUser);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = appErrors.create("invalid token!", 401, httpStatusText.ERROR);
    return next(error);
  }
};

module.exports = verifyToken;

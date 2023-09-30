const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    return res.status(401).json("invalid token");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    return res.status(401).json("invalid token");
  }
};

module.exports = verifyToken;

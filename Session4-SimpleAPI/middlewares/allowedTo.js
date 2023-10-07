const appErrors = require("../utils/appErrors");

module.exports = (...roles) => {
  console.log("roles", roles);
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(
        appErrors.create(
          "You are not allowed to access this resource",
          403,
          "Forbidden"
        )
      );
    }
    next();
  };
};

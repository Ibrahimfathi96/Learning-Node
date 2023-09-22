const { body } = require("express-validator");

const validationScheme = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is Required!")
      .isLength({ min: 2 })
      .withMessage("Title is At least 2 Digits!"),
    body("price")
      .notEmpty()
      .withMessage("Price is Required!")
      .isLength({ min: 2 })
      .withMessage("Price is At least 2 Digits!")
  ];
};
module.exports = {
  validationScheme
};

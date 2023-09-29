const { body } = require("express-validator");

const validationScheme = () => {
  return [
    body("title")
      .if(body("title").exists()) //in the patch it might not be exist
      .notEmpty()
      .withMessage("Title is Required!")
      .isLength({ min: 2 })
      .withMessage("Title is At least 2 Digits!"),
    body("price")
      .if(body("price").exists()) //in the patch it might not be exist
      .notEmpty()
      .withMessage("Price is Required!")
      .isLength({ min: 2 })
      .withMessage("Price is At least 2 Digits!")
  ];
};
module.exports = {
  validationScheme
};

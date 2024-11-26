const { body } = require("express-validator");
const registerValidation = [
  body("firstname").isLength({ min: 3, max: 20 }),
  body("lastname").isLength({ min: 3, max: 20 }),
  body("email").isEmail().withMessage("Email noto'g'ri kiritildi"),
  body("password").isLength({ min: 6, max: 20 }),
  body("phone").optional(),
  body("image").optional(),
];

const loginValidation = [
  body("email").isEmail().withMessage("Email noto'g'ri kiritildi"),
  body("password").isLength({ min: 6, max: 20 }),
];

module.exports = {
  registerValidation,
  loginValidation,
};

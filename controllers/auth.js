const { body, validationResult } = require("express-validator");
function createUserValidation() {
  return [
    body("nickname")
      .isLength({ min: 3, max: 20 })
      .withMessage("Nickname must be between 3 and 20 characters")
      .not()
      .contains(" ")
      .withMessage("Nickname should not contain spaces"),

    body("password")
      .isLength({ min: 4, max: 15 })
      .withMessage("Password must be between 4 and 15 characters")
      .notEmpty()
      .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{6,15}$/)
      .withMessage(
        "Password must contain at least one uppercase letter and one number"
      ),

    body("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ];
}
function validateMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { validateMiddleware, createUserValidation };

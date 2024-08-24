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
      .isLength({ min: 6, max: 15 })
      .withMessage("Password must be between 6 and 15 characters")
      .notEmpty()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,15}$/)
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    body("message")
      .isLength({ max: 500 })
      .withMessage("Message must be no more than 500 characters long")
      .custom((value) => {
        if (/<\/?[a-z][\s\S]*>/i.test(value)) {
          throw new Error("Message should not contain HTML or script tags");
        }
        return true;
      }),

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

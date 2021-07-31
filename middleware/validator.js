const { check, validationResult } = require("express-validator");

exports.signupValidator = [
  check("username")
    .not()
    .isEmpty()
    .trim()
    .withMessage("All fields are required"),
  check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
  check("password")
    .isLength({ min: 3 })
    .withMessage("password must be at least 3 chars long"),
];

exports.signinValidator = [
  check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
  check("password")
    .isLength({ min: 3 })
    .withMessage("password must be at least 3 chars long"),
];

exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({
      errorMessage: firstError,
    });
  }
  next();
};

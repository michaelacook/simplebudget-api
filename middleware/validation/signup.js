const { body } = require("express-validator")

module.exports = [
  body("firstName")
    .isAlpha()
    .withMessage("First name should contain only alphabetical characters.")
    .isLength({
      min: 1,
      max: undefined,
    })
    .withMessage("First name cannot be of 0 length."),
  body("lastName")
    .isAlpha()
    .withMessage("Last name should contain only alphabetical characters.")
    .isLength({
      min: 1,
      max: undefined,
    })
    .withMessage("Last name cannot be of 0 length."),
  body("email").isEmail().withMessage("Please provide a valid email."),
  body("password")
    .isAlphanumeric()
    .withMessage("Password can only contain numbers and letters.")
    .isLength({
      min: 5,
      max: undefined,
    })
    .withMessage("Password must be at least 5 characters long."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password.")
    }
    return true
  }),
  body("netSalary")
    .isNumeric()
    .withMessage("Net salary must contain only numbers"),
  body("netMonthlyIncome")
    .isNumeric()
    .withMessage("Net monthly income must contain only numbers.")
    .custom((value, { req }) => {
      if (value >= req.body.netSalary) {
        throw new Error("Monthly income cannot be greater or equal to salary.")
      }
      return true
    }),
]

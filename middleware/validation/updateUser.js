const { body } = require("express-validator")

module.exports = [
  body("firstName")
    .isAlpha()
    .withMessage("First name should contain only alphabetical characters."),
  body("lastName")
    .isAlpha()
    .withMessage("Last name should contain only alphabetical characters."),
  body("email").isEmail().withMessage("Please provide a valid email."),
  body("password")
    .isAlphanumeric()
    .withMessage("Password can only contain numbers and letters."),
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

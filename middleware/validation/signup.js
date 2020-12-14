const { body } = require("express-validator")

module.exports = [
  body("firstName")
    .isAlpha()
    .withMessage(
      "Please provide a name that contains only alphabetical characters"
    ),
  body("email").isEmail().withMessage("Please provide a valid email."),
  body("password")
    .isAlphanumeric()
    .withMessage("Password can only contain numbers and letters."),
  body("confirmPassword")
    .equals(body("password"))
    .withMessage("The passwords you have provided do not match."),
  body("netSalary")
    .isNumeric()
    .withMessage("Net salary must contain only numbers"),
  body("netMonthlyIncome")
    .isNumeric()
    .withMessage("Net monthly income must contain only numbers."),
]

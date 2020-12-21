const express = require("express")
const router = express.Router()
const budgetController = require("../controllers/budgetController")

router.get("/:id", (req, res, next) =>
  budgetController.getBudget(req, res, next)
)

router.post("/new", (req, res, next) =>
  budgetController.postBudget(req, res, next)
)

module.exports = router

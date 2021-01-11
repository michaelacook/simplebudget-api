const express = require("express")
const router = express.Router()
const budgetController = require("../controllers/budgetController")
const authorization = require("../middleware/authorization")()

router.get("/all", authorization, (req, res, next) =>
  budgetController.getAllBudgets(req, res, next)
)

router.get("/:id", (req, res, next) =>
  budgetController.getBudget(req, res, next)
)

router.put("/:id/update", (req, res, next) =>
  budgetController.putBudget(req, res, next)
)

router.post("/new", (req, res, next) =>
  budgetController.postBudget(req, res, next)
)

router.post("/category/new", authorization, (req, res, next) =>
  budgetController.postCategory(req, res, next)
)

router.delete("/:id/delete", (req, res, next) =>
  budgetController.deleteBudget(req, res, next)
)

module.exports = router

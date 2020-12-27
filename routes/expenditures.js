const express = require("express")
const router = express.Router()
const expenditureController = require("../controllers/expenditureController")
const authorization = require("../middleware/authorization")()

router.get("/:id?", authorization, (req, res, next) =>
  expenditureController.getExpenditure(req, res, next)
)

router.post("/new", authorization, (req, res, next) =>
  expenditureController.postExpenditure(req, res, next)
)

router.put("/:id", authorization, (req, res, next) =>
  expenditureController.putExpenditure(req, res, next)
)

router.delete("/:id", authorization, (req, res, next) =>
  expenditureController.deleteExpenditure(req, res, next)
)

module.exports = router

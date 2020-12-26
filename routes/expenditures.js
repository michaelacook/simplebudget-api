const express = require("express")
const router = express.Router()
const expenditureController = require("../controllers/expenditureController")

router.post("/new", (req, res, next) =>
  expenditureController.postExpenditure(req, res, next)
)

module.exports = router

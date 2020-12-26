const express = require("express")
const router = express.Router()
const expenditureController = require("../controllers/expenditureController")

router.post("/expenditures/new", (req, res, next) =>
  expenditureController.postExpenditure(req, res, next)
)

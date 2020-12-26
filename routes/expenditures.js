const express = require("express")
const router = express.Router()
const expenditureController = require("../controllers/expenditureController")
const authorization = require("../middleware/authorization")()

router.post("/new", authorization, (req, res, next) =>
  expenditureController.postExpenditure(req, res, next)
)

module.exports = router

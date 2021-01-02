const express = require("express")
const router = express.Router()
const billController = require("../controllers/billController")
const authorization = require("../middleware/authorization")()

router.get("/:id", authorization, (req, res, next) =>
  billController.getBill(req, res, next)
)

router.get("/", authorization, (req, res, next) =>
  billController.getBills(req, res, next)
)

router.post("/", authorization, (req, res, next) =>
  billController.postBill(req, res, next)
)

router.put("/:id", authorization, (req, res, next) =>
  billController.putBill(req, res, next)
)

router.delete("/:id", authorization, (req, res, next) =>
  billController.deleteBill(req, res, next)
)

module.exports = router

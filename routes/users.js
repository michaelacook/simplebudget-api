const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const authorization = require("../middleware/authorization")()

router.get("/", authorization, (req, res, next) => {
  userController.getUser(req, res, next)
})

router.post("/create", (req, res, next) => {
  userController.postUser(req, res, next)
})

router.put("/:id/update", (req, res, next) => {
  userController.putUser(req, res, next)
})

router.delete("/:id", (req, res, next) => {
  userController.deleteUser(req, res, next)
})

module.exports = router

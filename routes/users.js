const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const authorization = require("../middleware/authorization")()
const userValidation = require("../middleware/validation/signup")

router.get("/", authorization, (req, res, next) => {
  userController.getUser(req, res, next)
})

router.post("/create", userValidation, (req, res, next) => {
  userController.postUser(req, res, next)
})

router.put("/:id/update", userValidation, authorization, (req, res, next) => {
  userController.putUser(req, res, next)
})

router.delete("/:id", authorization, (req, res, next) => {
  userController.deleteUser(req, res, next)
})

module.exports = router

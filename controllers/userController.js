const userService = require("../services/userService")

module.exports = {
  getUser: async (req, res, next) => {
    try {
      const id = req.params.id
      const budget = req.query.budget 
      const user = userService.getUser
    } catch (err) {
      next(err)
    }
  }
}

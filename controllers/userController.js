const userService = require("../services/userService")

module.exports = {
  getUser: async (req, res, next) => {
    try {
      const id = req.params.id
      const budget = req.query.budget
      const user = await userService.getUser(id, budget ? true : null)
      return res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },
}

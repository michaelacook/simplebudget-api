const userService = require("../services/userService")

module.exports = {
  /**
   * Handle control for route /users/:id GET
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Function} next - next middleware
   * @return {String} json on success, next middleware on fail
   */
  getUser: async (req, res, next) => {
    try {
      const email = req.user.email
      const budget = req.query.budget
      const user = await userService.getUser(id, budget ? true : null)
      return res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },

  /**
   * Handle control for route /users/create POST
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Function} next - next middleware
   * @return {String} json on success, next middleware on fail
   */
  postUser: async (req, res, next) => {
    try {
      const id = await userService.createUser(req.body)
      return res.status(201).json(id)
    } catch (err) {
      next(err)
    }
  },

  /**
   * Handle control for route /users/:id/update PUT
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Function} next - next middleware
   * Send only a response status of 204 No Content
   */
  putUser: async (req, res, next) => {
    try {
      const id = req.params.id
      await userService.updateUser(id, req.body)
      return res.status(204).end()
    } catch (err) {
      next(err)
    }
  },

  /**
   * Handle control for route /users/:id/delete DELETE
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Function} next - next middleware
   * Send only a response status of 204 No Content
   */
  deleteUser: async (req, res, next) => {
    try {
      const id = req.params.id
      await userService.deleteUser(id)
      return res.status(204).end()
    } catch (err) {
      next(err)
    }
  },
}

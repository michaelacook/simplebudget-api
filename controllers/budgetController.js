const budgetService = require("../services/budgetService")

module.exports = {
  /**
   * Handle path /budget/:id
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   * @param {Func} next - next middleware call
   */
  getBudget: async (req, res, next) => {
    try {
      const id = req.params.id
      const budget = await budgetService.getBudget(id)
      return res.status(200).json(budget)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle path /budget/new POST
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   * @param {Func} next - next middleware call
   */
  postBudget: async (req, res, next) => {
    try {
      const payload = req.body
      const budgetId = await budgetService.createBudget(payload)
      return res.status(201).json(budgetId)
    } catch (error) {
      next(error)
    }
  },
}

const budgetService = require("../services/budgetService")

module.exports = {
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

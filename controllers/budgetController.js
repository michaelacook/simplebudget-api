const budgetService = require("../services/budgetService")

module.exports = {
  /**
   * Handle path /budget/:id
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   * @param {Func} next - next middleware call
   */
  getBudget: async function (req, res, next) {
    try {
      const id = req.params.id
      const budget = await budgetService.getBudget(id)
      return res.status(200).json(budget)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle path /budget/all
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   * @param {Func} next - next middleware call
   */
  getAllBudgets: async function (req, res, next) {
    try {
      const userId = req.user.id
      const budgets = await budgetService.getAllBudgets(userId)
      return res.status(200).json(budgets)
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
  postBudget: async function (req, res, next) {
    try {
      const payload = req.body
      const budget = await budgetService.createBudget(payload)
      return res.status(201).json(budget)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle path /budget/category/new POST
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   * @param {Func} next - next middleware call
   */
  postCategory: async function (req, res, next) {
    try {
      const payload = req.body
      const category = await budgetService.addCategory(payload)
      return res.status(201).json(category)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle path /budget/:id/update PUT
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   * @param {Func} next - next middleware call
   */
  putBudget: async function (req, res, next) {
    try {
      const payload = req.body
      const budgetId = req.params.id
      const budget = await budgetService.updateBudget(budgetId, payload)
      return res.status(200).json(budget)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle path /budget/category/:id/delete DELETE
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   * @param {Func} next - next middleware call
   */
  deleteCategory: async function (req, res, next) {
    try {
      const id = req.params.id
      await budgetService.deleteCategory(id)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle path /budget/:id/delete
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   * @param {Func} next - next middleware call
   */
  deleteBudget: async function (req, res, next) {
    try {
      const id = req.params.id
      await budgetService.deleteBudget(id)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  },
}

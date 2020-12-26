const { expenditureService } = require("../services/expenditureService")

module.exports = {
  /**
   * Handle route /expenditures/new POST
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  postExpenditure: async (req, res, next) => {
    try {
      const expenditures = req.body.expenditures
      await expenditureService.addExpenditure(expenditures)
      return res.status(201).end()
    } catch (error) {
      next(error)
    }
  },
}
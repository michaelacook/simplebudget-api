const expenditureService = require("../services/expenditureService")

module.exports = {
  /**
   * Handle route /expenditures/new POST
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  postExpenditure: async (req, res, next) => {
    try {
      await expenditureService.addExpenditure(req.body)
      return res.status(201).end()
    } catch (error) {
      next(error)
    }
  },
}

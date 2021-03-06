const expenditureService = require("../services/expenditureService")

module.exports = {
  /**
   * Handle route /expenditures/:id? GET
   * optional query params ?year, ?month, ?day
   * If id send expenditure for the given id
   * If no id and no query params, send expenditures for current year
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  getExpenditure: async function (req, res, next) {
    try {
      if (req.params.id) {
        const expenditure = await expenditureService.getOneExpenditure(
          req.params.id
        )
        return res.status(200).json(expenditure)
      }
      let expenditures
      if (req.query) {
        const { month, day, year, userId } = req.query
        if (month && day && year) {
          expenditures = await expenditureService.getExpendituresByDay(
            year,
            month,
            day,
            userId,
            req.query.budgetId ? req.query.budgetId : null
          )
        }
        if (year && month && !day) {
          expenditures = await expenditureService.getExpendituresByMonth(
            year,
            month,
            userId,
            req.query.budgetId ? req.query.budgetId : null
          )
        } else if (year && !month && !day) {
          expenditures = await expenditureService.getExpendituresByYear(
            year,
            userId,
            req.query.budgetId ? req.query.budgetId : null
          )
        } else if (!year && !month && !day) {
          const year = new Date().getFullYear()
          expenditures = await expenditureService.getExpendituresByYear(
            year,
            req.query.userId,
            req.query.budgetId ? req.query.budgetId : null
          )
        }
      }
      return res.status(200).json(expenditures)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle route /expenditures/new POST
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  postExpenditure: async function (req, res, next) {
    try {
      await expenditureService.addExpenditure(req.body)
      return res.status(201).end()
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle route /expenditures/:id PUT
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  putExpenditure: async function (req, res, next) {
    try {
      const id = req.params.id
      await expenditureService.updateExpenditure(id, req.body)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle route /expenditures/:id DELETE
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  deleteExpenditure: async function (req, res, next) {
    try {
      const id = req.params.id
      await expenditureService.deleteExpenditure(id)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle route /expenditures/statistics/:id GET
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  getTotals: async function (req, res, next) {
    try {
      const budgetId = req.params.id
      const year = req.params.year
      const month = req.query.month
      const totals = await expenditureService.getExpenditureTotals(
        budgetId,
        year,
        month
      )
      return res.status(200).json(totals)
    } catch (error) {
      next(error)
    }
  },
}

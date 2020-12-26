const { expenditureService } = require("../services/expenditureService")

module.exports = {
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

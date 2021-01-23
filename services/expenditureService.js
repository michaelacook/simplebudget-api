const { Budget, Category, Expenditure } = require("../models/index")

module.exports = {
  /**
   * Add one or more expenditures to the data store
   * @param {Number} categoryId - budget category PK
   * @param {Array} expenditures - array of expenditure objects to add
   * @return {Promise} true on success, promise reject on fail
   */
  addExpenditure: async function (expenditures) {
    try {
      await Expenditure.sync()
      expenditures.forEach(async (expenditure) => {
        await Expenditure.create({
          userId: expenditure.userId,
          budgetId: expenditure.budgetId,
          categoryId: expenditure.categoryId,
          amount: expenditure.amount,
          year: expenditure.year,
          month: expenditure.month,
          day: expenditure.day,
        })
      })
      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Get a single expenditure by PK
   * @param {Number} id - expenditure PK
   * @return {Promise} expenditure object on success, promise reject on fail
   */
  getOneExpenditure: async function (id, budgetId = null) {
    try {
      await Expenditure.sync()
      const options = {
        where: {
          id: id,
        },
        include: {
          model: Category,
          attributes: ["title", "id"],
        },
      }
      if (budgetId) {
        options.where["budgetId"] = budgetId
      }
      const expenditure = await Expenditure.findOne(options)
      return expenditure
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Get all expenditures for a given year
   * @param {Number} year
   * @param {Number} userId - user PK
   * @return {Promise} expenditures array on success, promise reject on fail
   */
  getExpendituresByYear: async function (year, userId, budgetId = null) {
    try {
      await Expenditure.sync()
      const options = {
        order: [["day", "ASC"]],
        where: {
          year: year,
          userId: userId,
        },
        include: [
          {
            model: Category,
            attributes: ["title"],
          },
          {
            model: Budget,
            attributes: ["id", "title"],
          },
        ],
      }
      if (budgetId) {
        options.where["budgetId"] = budgetId
      }
      const expenditures = await Expenditure.findAll(options)
      return expenditures
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Get all expenditures for a given month
   * @param {Number} year
   * @param {Number} month
   * @param {Number} userId - user PK
   * @return {Promise} expenditures array on success, promise reject on fail
   */
  getExpendituresByMonth: async function (
    year,
    month,
    userId,
    budgetId = null
  ) {
    try {
      await Expenditure.sync()
      const options = {
        order: [["day", "ASC"]],
        where: {
          year: year,
          month: month,
          userId: userId,
        },
        include: [
          {
            model: Category,
            attributes: ["title"],
          },
          {
            model: Budget,
            attributes: ["id", "title"],
          },
        ],
      }
      if (budgetId) {
        options.where["budgetId"] = budgetId
      }
      const expenditures = await Expenditure.findAll(options)
      return expenditures
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Get all expenditures for a given day
   * @param {Number} year
   * @param {Number} month
   * @param {Number} day
   * @param {Number} userId - user PK
   * @return {Promise} expenditures array on success, promise reject on fail
   */
  getExpendituresByDay: async function (
    year,
    month,
    day,
    userId,
    budgetId = null
  ) {
    try {
      await Expenditure.sync()
      const options = {
        where: {
          year,
          month,
          day,
          userId,
        },
        include: [
          {
            model: Category,
            attributes: ["title"],
          },
          {
            model: Budget,
            attributes: ["id", "title"],
          },
        ],
      }
      if (budgetId) {
        options.where["budgetId"] = budgetId
      }
      const expenditures = await Expenditure.findAll(options)
      return expenditures
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Update an expenditure in the data store
   * @param {Number} id - expenditure PK
   * @param {Object} payload - new values
   * @return {Promise} boolean true on success, promise reject on fail
   */
  updateExpenditure: async function (id, payload) {
    try {
      await Expenditure.sync()
      const expenditure = await Expenditure.findByPk(id)
      for (let key in payload) {
        expenditure[key] = payload[key]
        await expenditure.save()
      }
      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Hard delete an expenditure record in the data store
   * @param {Number} id - expenditure
   * @return {Promise} boolean true on success, promise reject on fail
   */
  deleteExpenditure: async function (id) {
    try {
      await Expenditure.sync()
      await Expenditure.destroy({
        where: {
          id: id,
        },
      })
      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Get spending totals for a given category and year, optionally month
   * @param {Number} categoryId
   * @param {Number} year
   * @param {Number} month
   * @return {Number} total
   */
  getExpenditureTotalByCategory: async function (
    categoryId,
    year,
    month = null
  ) {
    try {
      await Expenditure.sync()
      const options = {
        where: {
          categoryId,
          year,
        },
      }
      if (month) {
        options.where["month"] = month
      }
      const expenditures = await Expenditure.findAll(options)
      const total = expenditures.reduce((acc, curr) => {
        return (acc += curr.amount)
      }, 0)
      return total
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Get spending totals stats in each category for a given year and optionally month
   * @param {Number} budgetId
   * @param {Number} year
   * @param {Number} month
   * @return {Object} totals
   */
  getExpenditureTotals: async function (budgetId, year, month = null) {
    try {
      await Category.sync()
      await Expenditure.sync()
      const totals = {}
      const budgetCategories = await Category.findAll({
        where: {
          budgetId,
        },
      })
      for (let cat of budgetCategories) {
        const total = await this.getExpenditureTotalByCategory(
          cat.id,
          year,
          month
        )
        let prevMonth
        let prevYear
        if (month) {
          if (month == 1) {
            prevMonth = 12
            prevYear = year - 1
          } else {
            prevMonth = month - 1
          }
        } else {
          prevYear = year - 1
        }
        const prevTotal = await this.getExpenditureTotalByCategory(
          cat.id,
          prevYear ? prevYear : year,
          prevMonth
        )
        const difference =
          total > prevTotal
            ? Number((total - prevTotal).toFixed(2))
            : Number(((prevTotal - total) * -1).toFixed(2))
        const percentage = Number(((total / cat.amount) * 100).toFixed(2))
        totals[cat.title] = {
          total,
          prevTotal,
          difference,
          allottedAmount: cat.amount,
          percentageOfAmount: percentage,
        }
      }
      const total = Number(
        Object.values(totals)
          .reduce((acc, curr) => acc + curr.total, 0)
          .toFixed(2)
      )
      const prevTotal = Number(
        Object.values(totals)
          .reduce((acc, curr) => acc + curr.prevTotal, 0)
          .toFixed(2)
      )
      totals["total"] = total
      totals["prevTotal"] = prevTotal
      return totals
    } catch (error) {
      Promise.reject(error)
    }
  },
}

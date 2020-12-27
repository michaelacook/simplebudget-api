const { Expenditure } = require("../models/index")

module.exports = {
  /**
   * Add one or more expenditures to the data store
   * @param {Number} categoryId - budget category PK
   * @param {Array} expenditures - array of expenditure objects to add
   * @return {Promise} true on success, promise reject on fail
   */
  addExpenditure: async (expenditures) => {
    try {
      await Expenditure.sync()
      expenditures.forEach(async (expenditure) => {
        await Expenditure.create({
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

  getOneExpenditure: async (id) => {
    try {
    } catch (err) {
      Promise.reject(err)
    }
  },

  getExpendituresByYear: async (year) => {
    try {
    } catch (err) {
      Promise.reject(err)
    }
  },

  getExpendituresByMonth: async (year, month) => {
    try {
    } catch (err) {
      Promise.reject(err)
    }
  },

  getExpendituresByDay: async (year, month, day) => {
    try {
    } catch (err) {
      Promise.reject(err)
    }
  },

  updateExpenditure: async (id, payload) => {
    try {
    } catch (err) {
      Promise.reject(err)
    }
  },

  deleteExpenditure: async (id) => {
    try {
    } catch (err) {
      Promise.reject(err)
    }
  },
}

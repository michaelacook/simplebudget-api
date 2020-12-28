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

  /**
   * Get a single expenditure by PK
   * @param {Number} id - expenditure PK
   * @return {Promise} expenditure object on success, promise reject on fail
   */
  getOneExpenditure: async (id) => {
    try {
      await Expenditure.sync()
      const expenditure = await Expenditure.findOne({
        where: {
          id: id,
        },
      })
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
  getExpendituresByYear: async (year, userId) => {
    try {
      await Expenditure.sync()
      const expenditures = await expenditures.findAll({
        where: {
          year: year,
          userId: userId,
        },
      })
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
  getExpendituresByMonth: async (year, month, userId) => {
    try {
      await Expenditure.sync()
      const expenditures = await Expenditure.findAll({
        where: {
          year: year,
          month: month,
          userId: userId,
        },
      })
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
  getExpendituresByDay: async (year, month, day, userId) => {
    try {
      await Expenditure.sync()
      const expenditures = await Expenditure.findAll({
        where: {
          year: year,
          month: month,
          day: day,
          userId: userId,
        },
      })
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
  updateExpenditure: async (id, payload) => {
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
  deleteExpenditure: async (id) => {
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
}

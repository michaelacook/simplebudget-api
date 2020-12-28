const { Budget, Category, Expenditure } = require("../models/index")
const { Op } = require("sequelize")

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
  getOneExpenditure: async (id, budgetId = null) => {
    try {
      await Expenditure.sync()
      const options = {
        where: {
          id: id,
        },
        include: {
          model: Category,
          attributes: ["title"],
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
  getExpendituresByYear: async (year, userId, budgetId = null) => {
    try {
      await Expenditure.sync()
      const options = {
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
  getExpendituresByMonth: async (year, month, userId, budgetId = null) => {
    try {
      await Expenditure.sync()
      const options = {
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
  getExpendituresByDay: async (year, month, day, userId, budgetId = null) => {
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

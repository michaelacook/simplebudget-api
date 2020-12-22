const { Budget, Category } = require("../models/index")

module.exports = {
  /**
   * Get a budget
   * @param {Number} id - PK for budget
   * @param {Boolean} categories - true by default, if false don't eager load budget categories
   * @return {Promise} budget on success, rejected promise on fail
   */
  getBudget: async (id, categories = true) => {
    try {
      await Budget.sync()
      const options = {
        where: {
          id: id,
        },
      }
      if (categories) {
        options["include"] = {
          model: Category,
        }
      }
      const budget = await Budget.findOne(options)
      return budget
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Get all budgets for a user
   * @param {Number} userId - user PK
   * @param {Boolean} categories - true by default, if false don't eager load budget categories
   * @return {Promise} budget on success, rejected promise on fail
   */
  getAllBudgets: async (userId, categories = true) => {
    try {
      await Budget.sync()
      const options = {
        where: {
          userId: userId,
        },
      }
      if (categories) {
        options["include"] = {
          model: Categorty,
        }
      }
      const budgets = await Budget.findAll(options)
      return budgets
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Add a new budget with categories
   * @param {Object} destructured
   * @return {Promise} budgetId on success, promise reject on fail
   */
  createBudget: async ({ budget, categories }) => {
    try {
      await Budget.sync()
      const { title, description, total, userId } = budget
      const budgetId = await Budget.create({
        title,
        description,
        total,
        userId,
      })
      await Category.sync()
      categories.forEach(async (category) => {
        const key = Object.keys(category)[0]
        const value = Object.values(category)[0]
        await Category.create({
          title: key,
          amount: value,
          budgetId: budgetId.id,
        })
      })
      return budgetId.id
    } catch (err) {
      Promise.reject(err)
    }
  },

  updateBudget: async (id, payload) => {
    try {
      /*
      payload should contain a budgets and a categories property
      {
        budget: {
          title,
          description,
          total
        },
        categories: []
      } 
      */
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Hard delete a budget from the data store
   * @param {Number} userId - user PK the budget belongs to
   * @return {Promise} true on success, promise reject on fail
   */
  deleteBudget: async (userId) => {
    try {
      await Budget.sync()
      await Budget.destroy({
        where: {
          id: id,
        },
      })
      return true
    } catch (error) {
      Promise.reject(error)
    }
  },
}

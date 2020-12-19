const { Budget, Category } = require("../models/index")

module.exports = {
  getBudget: async (id) => {
    try {
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
        userId
      })
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
}

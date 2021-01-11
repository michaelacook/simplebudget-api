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
          model: Category,
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
   * @return {Promise} newly created budget, promise reject on fail
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
      const newlyCreated = await Budget.findOne({
        where: {
          id: budgetId.id,
        },
        include: {
          model: Category,
        },
      })
      return newlyCreated
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Update a budget in the data store
   * @param {Number} id - budget PK
   * @param {Object} payload - new values
   * @return {Object} updated budget
   */
  updateBudget: async (id, payload) => {
    try {
      await Budget.sync()
      await Category.sync()
      if (payload.budget) {
        const budget = await Budget.findByPk(id)
        for (let key in payload.budget) {
          budget[key] = payload.budget[key]
          await budget.save()
        }
      }
      if (payload.categories.length) {
        payload.categories.forEach(async (cat) => {
          const category = await Category.findOne({
            where: {
              id: cat.id,
              budgetId: id,
            },
          })
          for (let key in cat) {
            category[key] = cat[key]
            await category.save()
          }
        })
      }
      const budget = await Budget.findOne({
        where: {
          id,
        },
        include: {
          model: Category,
        },
      })
      return budget
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Add a new category for a budget
   * @param {Object} payload
   * @return {Object} newly created category
   */
  addCategory: async (payload) => {
    try {
      await Category.sync()
      const { title, amount, budgetId } = payload
      const category = Category.create({
        title,
        amount,
        budgetId,
      })
      return category
    } catch (error) {
      Promise.reject(error)
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
          id: userId,
        },
      })
      return true
    } catch (error) {
      Promise.reject(error)
    }
  },
}

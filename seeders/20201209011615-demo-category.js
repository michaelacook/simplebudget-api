"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        title: "Groceries",
        amount: 400,
        budgetId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Rent",
        amount: 1200,
        budgetId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Gas",
        amount: 60,
        budgetId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Beer",
        amount: 30,
        budgetId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Phone",
        amount: 70,
        budgetId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {})
  },
}

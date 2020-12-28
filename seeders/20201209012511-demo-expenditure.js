"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Expenditures", [
      {
        userId: 1,
        budgetId: 1,
        categoryId: 1,
        amount: 12.5,
        year: 2020,
        month: 12,
        day: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        budgetId: 1,
        categoryId: 3,
        amount: 49.56,
        year: 2020,
        month: 12,
        day: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        budgetId: 1,
        categoryId: 4,
        amount: 12.5,
        year: 2020,
        month: 12,
        day: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        budgetId: 1,
        categoryId: 2,
        amount: 1200,
        year: 2020,
        month: 12,
        day: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Expenditures", null, {})
  },
}

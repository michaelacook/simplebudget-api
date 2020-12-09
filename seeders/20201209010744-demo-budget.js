"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Budgets", [
      {
        title: "My Personal Budget",
        description: "A budget for my monthly expenses.",
        total: 3333,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Budgets", null, {})
  },
}

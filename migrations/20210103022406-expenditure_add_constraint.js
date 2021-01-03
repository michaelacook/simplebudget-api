"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Expenditures", {
      fields: ["budgetId"],
      type: "foreign key",
      name: "budgetId",
      references: {
        table: "Budgets",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Expenditures", "budgetId")
  },
}

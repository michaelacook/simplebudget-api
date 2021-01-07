"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Bills", {
      fields: ["userId"],
      type: "foreign key",
      name: "userId",
      references: {
        table: "Users",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Bills", "userId")
  },
}
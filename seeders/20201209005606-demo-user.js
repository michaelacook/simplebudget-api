"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Demo",
        lastName: "User",
        email: "email@email.com",
        password:
          "$2y$04$v1UYifwAp0cGkQmeOFWmp.K.LgGgrNiXm2aKFXQtvp1qxF61rgIQO", // 4 rounds
        netSalary: 40000,
        netMonthlyIncome: 3333.33,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {})
  },
}

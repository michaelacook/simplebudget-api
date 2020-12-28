"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Bill, Budget, Expenditure }) {
      User.hasMany(Bill, {
        foreignKey: "userId",
      })
      User.hasMany(Budget, {
        foreignKey: "userId",
      })
      User.hasMany(Expenditure, {
        foreignKey: "userId",
      })
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      netSalary: DataTypes.FLOAT,
      netMonthlyIncome: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "User",
    }
  )
  return User
}

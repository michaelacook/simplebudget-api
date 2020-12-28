"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Expenditure extends Model {
    static associate({ Budget, Category, User }) {
      Expenditure.belongsTo(Category, {
        foreignKey: "categoryId",
      })
      Expenditure.belongsTo(User, {
        foreignKey: "userId",
      })
      Expenditure.belongsTo(Budget, {
        foreignKey: "budgetId",
      })
    }
  }
  Expenditure.init(
    {
      userId: DataTypes.INTEGER,
      budgetId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      year: DataTypes.INTEGER,
      month: DataTypes.INTEGER,
      day: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Expenditure",
    }
  )
  return Expenditure
}

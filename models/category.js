"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ Budget, Expenditure }) {
      Category.belongsTo(Budget, {
        foreignKey: "budgetId",
      })
      Category.hasMany(Expenditure, {
        foreignKey: "categoryId",
      })
    }
  }
  Category.init(
    {
      title: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      budgetId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  )
  return Category
}

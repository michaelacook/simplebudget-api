"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    static associate({ Category, User }) {
      Budget.hasMany(Category, {
        foreignKey: "budgetId",
      })
      Budget.belongsTo(User, {
        foreignKey: "userId",
      })
    }
  }
  Budget.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      total: DataTypes.FLOAT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Budget",
    }
  )
  return Budget
}

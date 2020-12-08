"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Expenditure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expenditure.init(
    {
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

"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate({ User }) {
      Bill.belongsTo(User, {
        foreignKey: "userId",
      })
    }
  }
  Bill.init(
    {
      title: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      due: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  )
  return Bill
}

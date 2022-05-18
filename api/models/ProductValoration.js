const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class ProductValoration extends Model {}

ProductValoration.init(
  {
    valoration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    review: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db,
    modelName: "productvaloration",
  }
);

module.exports = ProductValoration;

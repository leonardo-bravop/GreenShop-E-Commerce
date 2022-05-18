const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class CategoryFamily extends Model {}

CategoryFamily.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "categoryfamilies",
  }
);
module.exports = CategoryFamily;

const db = require("../db");
const { Model, DataTypes } = require("sequelize");

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      set(value) {
        // Set price with 2 decimals
        this.setDataValue("price", parseFloat(value).toFixed(2));
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  { sequelize: db, modelName: "products" }
);

module.exports = Product;

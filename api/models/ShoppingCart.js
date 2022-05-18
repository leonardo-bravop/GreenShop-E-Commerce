const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class ShoppingCart extends Model {}

ShoppingCart.init(
  {
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      set(value) {
        // Set price with 2 decimals
        this.setDataValue("total", parseFloat(value).toFixed(2));
      },
    },
  },

  { sequelize: db, tableName: "shoppingcarts" }
);

module.exports = ShoppingCart;
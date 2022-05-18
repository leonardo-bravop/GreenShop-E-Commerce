const db = require("../db");
const { Model, DataTypes } = require("sequelize");
//const marked = require("marked");

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
      // get() {
      //   const rawPrice = this.getDataValue("price");
      //   console.log(`el prices es`, rawPrice);
      //   const largo = rawPrice.length;
      //   if (largo <= 3) return rawPrice;
      //   else if (largo > 3 && largo < 6) {
      //     return (
      //       rawPrice.slice(0, largo - 3) +
      //       "," +
      //       rawPrice.slice(largo - 3, largo)
      //     );
      //   }
      // },
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

const { Product } = require("../models");
const OrderItem = require("../models/OrderItem");

exports.add = (req, res, next) => {
  const { price, quantity, productId, orderdetailId } = req.body;
  OrderItem.create({ price, quantity, productId, orderdetailId })
    .then((newOrderItem) => res.send(newOrderItem))
    .catch((error) => {
      next(error);
    });
};
exports.getAll = (req, res, next) => {
  const { id } = req.params;
  OrderItem.findAll({
    where: { orderdetailId: id },
    include: { model: Product },
  })
    .then((data) => res.send(data))
    .catch((error) => {
      next(error);
    });
};

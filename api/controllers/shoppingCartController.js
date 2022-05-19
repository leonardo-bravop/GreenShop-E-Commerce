const ShoppingCart = require("../models/ShoppingCart");

exports.get = (req, res, next) => {
  const { id } = req.params;
  ShoppingCart.findOrCreate({
    where: { UserId: id },
    defaults: {
      total: 0,
    },
  })
    .then((shoppingCart) => res.send(shoppingCart[0]))
    .catch((error) => {
      next(error);
    });
};

exports.update = (req, res, next) => {
  const { id, total } = req.body;

  ShoppingCart.update({ total }, { where: { id }, returning: true })
    .then((shoppingCart) => res.send(shoppingCart))
    .catch((error) => {
      next(error);
    });
};

exports.destroy = (req, res, next) => {
  const { id } = req.params;

  ShoppingCart.destroy({ where: { id } })
    .then(() => res.sendStatus(202))
    .catch((error) => {
      next(error);
    });
};

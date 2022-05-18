const ItemCart = require("../models/CartItem");
const { Product } = require("../models");

exports.postOrAdd = (req, res, next) => {
  const { quantity, productId, ShoppingCartId } = req.body;

  ItemCart.findOrCreate({
    where: { productId, ShoppingCartId },
    defaults: { quantity },
  })
    .then((itemCart) => {
      return ItemCart.update(
        { quantity },
        {
          where: { id: itemCart[0].id },
          returning: true,
          plain: true,
        }
      );
    })
    .then((data) => {
      res.send(data[1]);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAll = (req, res, next) => {
  const { id } = req.params;

  ItemCart.findAll({
    where: { ShoppingCartId: id },
    include: { model: Product },
  })
    .then((items) => {
      items.sort((a, b) => {
        return a.id - b.id;
      });

      console.log(`items son`, items);
      res.send(items);
    })
    .catch((error) => {
      next(error);
    });
};

exports.delete = (req, res, next) => {
  const { id } = req.params;
  ItemCart.destroy({
    where: { id },
  })
    .then(() => res.sendStatus(204))
    .catch((error) => {
      next(error);
    });
};

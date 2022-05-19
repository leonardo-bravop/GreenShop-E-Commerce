const ProductValoration = require("../models/ProductValoration");
const User = require("../models/User");

exports.add = (req, res, next) => {
  const { productId } = req.params;
  const { UserId, review, valoration } = req.body;

  ProductValoration.findOne({ where: UserId })
    .then((valoration) => {
      if (valoration) {
        return true;
      } else return null;
    })
    .then((prodValoration) => {
      if (prodValoration)
        return prodValoration.update({ valoration }, { returning: true });
      else {
        return ProductValoration.create({
          UserId,
          valoration,
          productId,
          review,
        });
      }
    })
    .then((newValoration) => res.send(newValoration))
    .catch((error) => {
      next(error);
    });
};

exports.update = (req, res, next) => {
  const { productId } = req.params;
  const { UserId, review, valoration } = req.body;
  ProductValoration.update(
    { review, valoration },
    { where: { UserId, productId }, returning: true }
  )
    .then((valoration) => {
      res.send(valoration);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAll = (req, res, next) => {
  const { productId } = req.params;
  ProductValoration.findAll({ where: { productId }, include: User })
    .then((result) => res.send(result))
    .catch((error) => {
      next(error);
    });
};

exports.getAverageByProductId = (req, res, next) => {
  const { productId } = req.params;
  ProductValoration.findAll({ where: { productId } })
    .then((result) => {
      let average = result
        .reduce((sum, valObj) => {
          return sum + valObj.valoration / result.length;
        }, 0)
        .toFixed(1);
      res.send({ average });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getByUserIdAndProdId = (req, res, next) => {
  const { productId, UserId } = req.params;

  ProductValoration.findOne({ where: { UserId, productId } })
    .then((valoration) => {
      if (valoration) {
        res.send(valoration);
      } else res.send({ valoration: null });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteAll = (req, res, next) => {
  ProductValoration.destroy({ where: {} })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      next(error);
    });
};

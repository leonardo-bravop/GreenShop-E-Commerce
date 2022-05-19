const OrderDetail = require("../models/OrderDetail");

exports.add = (req, res, next) => {
  const { UserId, total } = req.body;
  OrderDetail.create({ UserId, total, status: "pending" })
    .then((newOrderDetail) => {
      res.send(newOrderDetail);
    })
    .catch((error) => {
      next(error);
    });
};

exports.update = (req, res, next) => {
  const { id } = req.params;
  OrderDetail.update(req.body, {
    where: {
      id,
    },
    returning: true,
    plain: true,
  })
    .then((result) => {
      const user = result[1];
      res.status(201).json({
        user,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAll = (req, res, next) => {
  const { UserId } = req.params;
  OrderDetail.findAll({ where: { UserId } })
    .then((orders) => res.send(orders))
    .catch((error) => {
      next(error);
    });
};

exports.getOne = (req, res, next) => {
  const { id, UserId } = req.params;
  OrderDetail.findOne({ where: { id, UserId } })
    .then((order) => res.send(order))
    .catch((error) => {
      next(error);
    });
};

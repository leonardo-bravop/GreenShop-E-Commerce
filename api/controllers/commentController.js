const ProductComment = require("../models/ProductComment");

exports.addComment = (req, res, next) => {
  const { userId, productId, userName, comment } = req.body;
  ProductComment.create({ userId, productId, userName, comment })
    .then((newComment) => res.send(newComment))
    .catch((error) => {
      next(error);
    });
};

exports.getAllComments = (req, res, next) => {
  const { productId } = req.params;
  ProductComment.findAll({ where: { productId } })
    .then((comments) => res.send(comments))
    .catch((error) => {
      next(error);
    });
};

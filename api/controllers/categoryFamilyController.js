const Category = require("../models/Category");
const CategoryFamily = require("../models/CategoryFamily");

exports.getAll = (req, res, next) => {
  CategoryFamily.findAll()
    .then((result) => res.send(result))
    .catch((error) => {
      next(error);
    });
};

exports.getAllCategories = (req, res, next) => {
  CategoryFamily.findAll({ include: Category })
    .then((result) => res.send(result))
    .catch((error) => {
      next(error);
    });
};

exports.newCategoryFamily = (req, res, next) => {
  const { name, description } = req.body;
  CategoryFamily.findOrCreate({
    where: { name },
    defaults: { description },
  })
    .then((category) => res.send(category))
    .catch((error) => {
      next(error);
    });
};
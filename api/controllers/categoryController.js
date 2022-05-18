const Category = require("../models/Category");
const Product = require("../models/Product");
const CategoryFamily = require("../models/CategoryFamily");

exports.addCategoryProduct = (req, res, next) => {
  const { productId, categoryId } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      product.addCategoria(categoryId);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      next(error);
    });
};

exports.addmanyRelations = (req, res, next) => {
  const { productId, objCategoryId } = req.body;
  const newcategoryIdsArr = [];
  for (const categId in objCategoryId) {
    if (objCategoryId[categId]) newcategoryIdsArr.push(categId);
    // else removecategoryIdsArr.push(categId);
  }
  Product.findByPk(productId)
    .then((product) => {
      product.addCategorias(newcategoryIdsArr);
    })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteRelation = (req, res, next) => {
  const { productId, categoryId } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      product.removeCategoria(categoryId);
    })
    .then((result) => res.send(result))
    .catch((error) => {
      next(error);
    });
};

exports.updateRelation = (req, res, next) => {
  const { productId, objCategoryId } = req.body;
  //categoryId es un array
  const addcategoryIdsArr = [];
  //   const removecategoryIdsArr = [];
  for (const categId in objCategoryId) {
    if (objCategoryId[categId]) addcategoryIdsArr.push(categId);
    // else removecategoryIdsArr.push(categId);
  }
  //crear arr de categoryIds
  Product.findByPk(productId)
    .then((product) => {
      product.setCategorias(addcategoryIdsArr);
    })
    .then((result) => res.send(result))
    .catch((error) => {
      next(error);
    });
};

exports.newCategory = (req, res, next) => {
  const { name, description, categoryfamilyId } = req.body;
  Category.findOrCreate({
    where: { name },
    defaults: { description, categoryfamilyId },
  })
    .then((category) => res.send(category))
    .catch((error) => {
      next(error);
    });
};

exports.getAll = (req, res, next) => {
  Category.findAll({ include: CategoryFamily })
    .then((result) => res.send(result))
    .catch((error) => {
      next(error);
    });
};

exports.getByFamilyId = (req, res, next) => {
  const { familyId } = req.params;

  Category.findAll({ where: { categoryfamilyId: familyId } })
    .then((result) => res.send(result))
    .catch((error) => {
      next(error);
    });
};

exports.getByName = (req, res, next) => {
  const { name } = req.params;
  console.log(`name es`, name);
  Category.findOne({ where: { name } })
    .then((category) => res.send(category))
    .catch((error) => {
      next(error);
    });
};

exports.getCatsByProdId = (req, res, next) => {
  const { id } = req.params;
  console.log(`id es`, id);
  Product.findByPk(id)
    .then((product) => {
      return product.getCategorias();
    })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteByCategId = (req, res, next) => {
  const { id } = req.params;
  Category.destroy({ where: { id } })
    .then((data) => res.sendStatus(202))
    .catch((error) => {
      next(error);
    });
};

exports.updateByCategId = (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  console.log(`name es`, name);
  Category.update(req.body, { where: { id } })
    .then((data) => res.sendStatus(201))
    .catch((error) => {
      next(error);
    });
};

exports.getByCategId = (req, res, next) => {
  const { id } = req.params;
  Category.findByPk(id, { include: CategoryFamily })
    .then((category) => res.send(category))
    .catch((error) => {
      next(error);
    });
};

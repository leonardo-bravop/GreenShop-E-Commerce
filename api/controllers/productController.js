const Product = require("../models/Product");
const ProductComment = require("../models/ProductComment");
const { Op } = require("sequelize");
const { Category } = require("../models");
const CategoryFamily = require("..//models/CategoryFamily");

exports.getAll = (req, res, next) => {
  Product.findAll({
    include: [{ model: Category, as: "categorias", attributes: ["id"] }],
  })
    .then((products) => res.send(products.reverse()))
    .catch((error) => {
      next(error);
    });
};

exports.getLatest = (req, res, next) => {
  Product.findAll({
    include: [{ model: Category, as: "categorias", attributes: ["id"] }],
  })
    .then((products) => res.send(products.reverse().slice(0, 10)))
    .catch((error) => {
      next(error);
    });
};

exports.getById = (req, res, next) => {
  const { id } = req.params;

  Product.findOne({
    where: { id },
    include: [{ model: Category, as: "categorias", attributes: ["id"] }],
  })
    .then((product) => {
      res.send(product);
    })
    .catch((error) => {
      next(error);
    });
};

exports.add = (req, res, next) => {
  const { name, description, category, price, stock, img } = req.body;
  Product.findOrCreate({
    where: { name },
    defaults: {
      name,
      description,
      category,
      price,
      stock,
      img,
    },
  })
    .then((product) => {
      res.send(product);
    })
    .catch((error) => {
      next(error);
    });
};

exports.addValoration = (req, res, next) => {
  const { id } = req.params;

  Product.update(req.body, {
    where: {
      id,
    },
    returning: true,
    plain: true,
  })
    .then((result) => {
      const valoracion = result[1];
      res.status(201).json({
        valoracion,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.update = (req, res, next) => {
  const { id } = req.params;
  console.log(`req body es`, req.body);
  Product.update(req.body, {
    where: {
      id,
    },
    returning: true,
    plain: true,
  })
    .then((result) => {
      console.log(`result es`, result);
      const product = result[1];
      res.status(201).json({
        product,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.delete = (req, res, next) => {
  const { id } = req.params;
  Product.destroy({ where: { id } })
    .then((data) => res.sendStatus(202))
    .catch((error) => {
      next(error);
    });
};

//// Productos I (categoria)

exports.getByCategory = (req, res, next) => {
  const { id } = req.params;

  Category.findByPk(id, { include: { model: Product, as: "productos" } })
    .then((category) => {
      return category.getProductos();
    })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getByMultiCategory = (req, res, next) => {
  const { categoriesId } = req.body;

  Product.findAll({
    include: [{ model: Category, as: "categorias", attributes: ["id"] }],
  })
    .then((products) => {
      products = products.filter((product) => {
        for (let i = 0; i < product.categorias.length; i++) {
          let condicion = categoriesId.includes(
            product.categorias[i].dataValues.id
          );
          if (categoriesId.includes(product.categorias[i].dataValues.id))
            return true;
        }
      });
      res.send(products);
    })
    .catch((error) => {
      next(error);
    });
  s;
};

exports.getByFamilyId = (req, res, next) => {
  const { familyId } = req.params;
  const categoriesId = [];
  const productos = [];

  //ESTO FUNCIONA
  CategoryFamily.findByPk(familyId, { include: Category })
    .then((family) => {
      const familyCategories = family.dataValues.categories;
      for (let i = 0; i < familyCategories.length; i++) {
        categoriesId.push(familyCategories[i].id);
      }
      return Product.findAll({
        include: [{ model: Category, as: "categorias", attributes: ["id"] }],
      });
    })
    .then((products) => {
      products = products.filter((product) => {
        for (let i = 0; i < product.categorias.length; i++) {
          if (categoriesId.includes(product.categorias[i].dataValues.id))
            return true;
        }
      });
      res.send(products);
    })
    .catch((error) => {
      next(error);
    });

  // CategoryFamily.findByPk(familyId, {
  //   include: [
  //     {
  //       model: Category,
  //       include: {
  //         model: Product,
  //         as: "productos",
  //       },
  //     },
  //   ],
  // }).then((family) => {
  //   const familyCategories = family.dataValues.categories;
  //   for (let i = 0; i < familyCategories.length; i++) {
  //     for (
  //       let j = 0;
  //       j < familyCategories[i].dataValues.productos.length;
  //       j++
  //     ) {
  //       productos.push(familyCategories[i].dataValues.productos[j]);
  //     }
  //   }
  //   res.send(productos);
  // }) .catch((error) => {
  //   next(error);
  // });
};

exports.getByName = (req, res, next) => {
  let { name } = req.params;
  name = name.trim();

  if (name) {
    Product.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } })
      .then((products) => {
        res.send(products);
      })
      .catch((error) => {
        next(error);
      });
  }
};

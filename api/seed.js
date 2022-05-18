const fakeData = require("./Product.json");
const db = require("./db");
const { Product } = require("./models");
const { Role } = require("./models");
const { CategoryFamily } = require("./models");
const { Category } = require("./models");

const setupSeed = () => {
  const fake = [];
  for (let i = 0; i < fakeData.productos.length; i++) {
    fake.push(fakeData.productos[i]);
  }
  const admin = [{ role: "Client" }, { role: "Admin" }, { role: "SuperAdmin" }];
  const categoryFamilies = [
    {
      name: "Plants",
      description: "Green Living beigns",
    },
    {
      name: "Accesories",
      description: "Accesories to take care of plants",
    },
  ];
  const categories = [
    {
      name: "All Plants",
      description: "All our green living beings",
      categoryfamilyId: "1",
    },
    {
      name: "All Accesories",
      description: "The best plant accesories",
      categoryfamilyId: "2",
    },
    {
      name: "House Plants",
      description: "The green homies",
      categoryfamilyId: "1",
    },
    {
      name: "Fertilizers",
      description: "Plants food",
      categoryfamilyId: "2",
    },
  ];

  return Role.bulkCreate(admin)
    .then((roles) => CategoryFamily.bulkCreate(categoryFamilies))
    .then((categoryFamilies) => Category.bulkCreate(categories));
};

db.sync().then(setupSeed);

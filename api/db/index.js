const Sequelize = require('sequelize');
require('dotenv').config()

const db = new Sequelize('greenshop', null, null, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

// const db = new Sequelize(process.env.DATABASE_URL,
//   {
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   });

module.exports = db;

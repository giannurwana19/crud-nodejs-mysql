const sequelize = require('sequelize');

const db = new sequelize('crud_nodejs_mysql', 'root', '', {
  dialect: 'mysql',
});

db.sync({});

module.exports = db;

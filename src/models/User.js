const sequelize = require('sequelize');

const db = require('../config/db');

const User = db.define(
  'User',
  {
    username: { type: sequelize.STRING },
    email: { type: sequelize.STRING },
    password: { type: sequelize.STRING },
  },
  {
    timestamps: true,
    freezeTableName: false,
  }
);

module.exports = User;

// DOCS

// jika true maka table kita akan menjadi users
// freezeTableName: false,

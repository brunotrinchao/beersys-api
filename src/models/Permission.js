const { Sequelize } = require('sequelize');
const db = require('../config/dbSequelize');

module.exports = db.define("permissions", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    key: {
      type: Sequelize.CHAR(3),
      valueDefault: 'CLI',
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    }
});

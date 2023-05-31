const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');

const Category = db.define("category", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.CHAR(3),
      valueDefault: 'ATI',
      allowNull: false,
      comment: 'ATI = Ativo, INA = Inativo',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    menus_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'menus',
        key: 'id'
      }
    }
});

// Category.sync({ force: true });

module.exports = Category;
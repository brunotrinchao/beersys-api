const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');

const Product = require('./Product');


const Category = db.define("categories", {
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
    image: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.CHAR(3),
      valueDefault: 'ATI',
      allowNull: false,
      comment: 'ATI = Ativo, INA = Inativo',
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    menus_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'menus',
        key: 'id'
      }
    }
});

// Category.sync({force: true});

Category.hasMany(Product, { foreignKey: 'categories_id' });

module.exports = Category;
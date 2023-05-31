const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');

const Product = db.define("products", {
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
  description: {
    type: Sequelize.STRING,
  },
  photo: {
    type: Sequelize.STRING  
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
  },
    
    categories_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
});

// Product.sync({force: true});

module.exports = Product;
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');
const Category = require('./Category');

const Menu = db.define("menu", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  status: {
    type: Sequelize.CHAR(3),
    allowNull: false,
    defaultValue: 'ATI',
    comment: 'ATI:Ativo|INA:Inativo',
  },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    companies_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      }
    }
});

// Menu.sync({ force: true});

Menu.hasMany(Category, { foreignKey: 'menus_id' });


module.exports = Menu;
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');

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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    companies_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      }
    }
});

// Menu.sync();

module.exports = Menu;
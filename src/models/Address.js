const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');
const Company = require('./Company');

const Address = db.define("Address", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    zipcode: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.INTEGER
    },
    neighborhood: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
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
},{
    tableName: 'address'
});

// Address.sync();

module.exports = Address;

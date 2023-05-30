const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');
const Company = require('./Company');

const model = db.define("address", {
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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    company_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'company',
        key: 'id'
      }
    }
},{
    tableName: 'address'
});

module.exports = model;

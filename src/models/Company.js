const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');
const User = require('./User');
const Address = require('./Address');

const Company = db.define("company", {
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
    status: {
      type: Sequelize.CHAR(3),
      valueDefault: 'ATI',
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    users_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
});

// console.log(CompanyModel);
// Company.sync();

Company.hasOne(Address, { foreignKey: 'companies_id' });


module.exports = Company;

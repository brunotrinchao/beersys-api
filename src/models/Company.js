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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
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

Company.belongsTo(User, { foreignKey: 'users_id' });
Address.belongsTo(Company, { foreignKey: 'company_id', sourceKey: "id" });

module.exports = Company;

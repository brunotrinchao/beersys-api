const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');
const Permission = require('./Permission');
const Company = require('./Company');

const User = db.define("user", {
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
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    permission_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'permissions',
        key: 'id'
      }
    }
});
// User.sync();

User.belongsTo(Permission, { foreignKey: 'permission_id' });

User.hasMany(Company, { foreignKey: 'users_id' });


module.exports = User;

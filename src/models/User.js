const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');
const Permission = require('./Permission');
const Company = require('./Company');

const User = db.define("User", {
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
    permission_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Permission',
        key: 'id'
      }
    }
});
// User.sync();

User.belongsTo(Permission, { foreignKey: 'permission_id' });

// User.associate = (models) => {
//   User.hasMany(models.CompanyModel);
// }

//  Permission.hasOne(User, { foreignKey: 'permission_id' });

module.exports = User;

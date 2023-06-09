const { Sequelize } = require('sequelize');
const db = require('../config/dbSequelize');
const User = require('./User'); 
const Permission = db.define("permissions", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    key: {
      type: Sequelize.CHAR(3),
      valueDefault: 'CLI',
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    updatedAt: {
      allowNull: false,
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
});

Permission.associate = (models) => {
  Permission.hasMany(models.User, {
    foreignKey: 'permission_id'
  });
}

Permission.sync();
// Permission.hasMany(User, { foreignKey: 'permission_id' });

module.exports = Permission;

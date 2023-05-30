const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbSequelize');

const Contact = db.define("Contact", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
});

// Address.sync();

module.exports = Contact;
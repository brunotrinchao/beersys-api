const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbSequelize");

const Schedules = db.define("schedules", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  day: {
    type: Sequelize.CHAR(3),
  },
  start: {
    type: Sequelize.TIME,
  },
  end: {
    type: Sequelize.TIME,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

// Schedules.sync({ force: true });

module.exports = Schedules;

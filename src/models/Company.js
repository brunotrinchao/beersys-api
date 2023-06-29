const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbSequelize");
const User = require("./User");
const Address = require("./Address");
const Menu = require("./Menu");
const Contact = require("./Contact");
const Schedules = require("./Schedules");

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
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.CHAR(3),
    valueDefault: "ATI",
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  users_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});

// console.log(CompanyModel);
// Company.sync();

Company.hasOne(Address, { foreignKey: "companies_id" });
Company.hasOne(Menu, { foreignKey: "companies_id" });
Company.hasMany(Contact, { foreignKey: "companies_id" });
Company.hasMany(Contact, { foreignKey: "companies_id" });
Company.hasMany(Schedules, { foreignKey: "companies_id" });

module.exports = Company;

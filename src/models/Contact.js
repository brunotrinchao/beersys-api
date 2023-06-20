const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbSequelize");
const Company = require("./Company");

const Contact = db.define("contact", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  contact: {
    type: Sequelize.STRING(20),
  },
  type: {
    type: Sequelize.CHAR(3),
    comment: "EMA:E-mail|TEL:Telefone|CEL:Celular|WAP:WhatsApp",
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  companies_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: "companies",
      key: "id",
    },
  },
});

// Address.sync();

module.exports = Contact;

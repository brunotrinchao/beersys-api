'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
          name: "Admin",
          email: "admin@admin.com",
          password: bcrypt.hashSync("admin", 8),
          permission_id: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};

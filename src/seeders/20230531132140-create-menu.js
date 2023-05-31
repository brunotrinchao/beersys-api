'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menus', [
      {
        companies_id: 1,
     }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('menus', null, {});
  }
};

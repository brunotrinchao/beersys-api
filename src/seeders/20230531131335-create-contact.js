'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contacts', [
      {
        contact: '(71) 99999-9999',
        type: 'CEL',
        companies_id: 1,
     }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contacts', null, {});
  }
};

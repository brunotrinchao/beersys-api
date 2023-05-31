'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('address', [
      {
        zipcode: '41720-040',
        address: 'Rua das Gaivotas',
        number: '123',
        neighborhood: 'Imbuí',
        country: 'Bahia',
        city: 'salvador',
        companies_id: 1,
     }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('address', null, {});
  }
};

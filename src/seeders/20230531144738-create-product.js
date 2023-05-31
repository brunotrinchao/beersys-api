'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Picanha',
        description: 'Nome do produto',
        photo: '',
        price: 98.45,
        categories_id: 1,
     }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};

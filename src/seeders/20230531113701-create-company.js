'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('companies', [
      {
        name: "Beer & Cia",
        description: 'Cervejaria artesanal',
        photo: '',
        status: 'ATI',
        users_id: 1,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {});
    
  }
};

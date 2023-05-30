'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      key: {
        type: Sequelize.CHAR(3),
        valueDefault: 'CLI',
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        get: () => {
          return this.getDataValue('key') == 'CLI' ? 'Cliente' : 'Administrador';
        }
      }
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('permissions');

  }
};

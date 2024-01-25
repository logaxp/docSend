'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permissions', [
      {
        name: 'Can edit',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Can view',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Can comment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all records inserted in the 'up' method
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};

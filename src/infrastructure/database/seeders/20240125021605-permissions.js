'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('permissions', [
      {
        name: 'Can edit',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Can view',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Can comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Add more records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all records inserted in the 'up' method
    await queryInterface.bulkDelete('permissions', null, {});
  }
};

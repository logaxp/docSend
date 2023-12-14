'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
     await queryInterface.bulkInsert('DocumentPermissions', [
      {
        can_view: 1,
        can_edit: 1,
        can_delete: 1,
        can_share: 1,
        can_download: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        can_view: 1,
        can_edit: 0,
        can_delete: 0,
        can_share: 0,
        can_download: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const date = new Date();

    await queryInterface.bulkInsert('Roles', [
      { role_name: 'super admin', created_at: date, updated_at: date},
      { role_name: 'admin', created_at: date, updated_at: date},
      { role_name: 'staff', created_at: date, updated_at: date},
      { role_name: 'user', created_at: date, updated_at: date}
    ], {});
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */
     await queryInterface.bulkDelete('Roles', null, {});
    
  }
};

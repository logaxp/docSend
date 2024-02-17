'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = process.env.SEED_SUPER_ADMIN_USER_PASSWORD || '123456';

    try {
      const [user] = await queryInterface.sequelize.query(`
        INSERT INTO users 
        (firstname, lastname, email, phone_no, password, type, status, created_at, updated_at) 
        VALUES ('John', 'Doe', 'demo@docsend.com', '+234 703487228', '${password}', 'Organization', 1, NOW(), NOW())
      `);

      const [role] = await queryInterface.sequelize.query(`
        SELECT id FROM roles WHERE role_name='super admin'
      `);

      // console.log(role[0].id);

      await queryInterface.sequelize.query(`
        INSERT INTO user_role
        (user_id, role_id, created_at, updated_at)
        VALUE
        ('${user}', '${role[0].id}', NOW(), NOW())
      `)

      // console.log('User inserted successfully:', user);
    } catch (error) {
      console.error('Failed to insert user:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    // Add commands to revert seed here.
    // Example: await queryInterface.bulkDelete('People', null, {});
    return await queryInterface.bulkDelete('users', null, {});
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

      await queryInterface.bulkInsert('Exhibits', [{
            name: 'Public Exhibit',
            description: 'Public Exhibit',
            location: '100.11,200.22',
            address: 'Common Exhibit',
            visible: true,
            start_date: new Date(),
            created_at: new Date(),
            updated_at: new Date()

        }
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Exhibits', {name:'Public Exhibit'}, {})
  }
};

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
     await queryInterface.bulkInsert('Artworks', [{
        title: 'Overview',
        description: ' Mission San Luis',
        art_type:'Monument',
        more_info:'',
        approved:true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        exhibit_id: 1,
        user_id: 1
      },

      {
        title: 'Spanish Village',
        description: 'Spanish Village Description',
        art_type:'Monument',
        more_info:'',
        approved:true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        exhibit_id: 1,
        user_id: 1
      },

      {
        title: 'Fort',
        description: 'Fort description',
        art_type:'Monument',
        more_info:'',
        approved:true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        exhibit_id: 1,
        user_id: 1
      },

      {
        title: 'Religious Comples',
        description: 'Some description of Religious Comples',
        art_type:'Monument',
        more_info:'',
        approved:true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        exhibit_id: 1,
        user_id: 1
      },

      {
        title: 'Council House',
        description: 'Here goes the description of the council house',
        art_type:'Monument',
        more_info:'',
        approved:true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        exhibit_id: 1,
        user_id: 1
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
  }
};

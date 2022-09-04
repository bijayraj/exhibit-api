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

     await queryInterface.bulkInsert('artwork_assets', [{
        title: 'Overview Logo',
        description:'Image of the overview logo',
        address: 'https://myweb.fsu.edu/sshamp/Prototype/Overview.jpg',
        asset_type: 0,
        visible: true,
        approved: true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        artwork_id: 1
      },
      
      {
        title: 'Overview Audio English',
        description:'English audio description',
        address: 'https://myweb.fsu.edu/sshamp/Prototype/OverviewEng.mp3',
        asset_type: 1,
        visible: true,
        approved: true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        artwork_id: 1
      },

      {
        title: 'Overview Audio Spanish',
        description:'English audio description',
        address: 'https://myweb.fsu.edu/sshamp/Prototype/OverviewSpn.mp3',
        asset_type: 1,
        visible: true,
        approved: true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        artwork_id: 1
      },

      {
        title: 'Spanish Village Image',
        description:'Image of Spanish Village',
        address: 'https://myweb.fsu.edu/sshamp/Prototype/SpanishVillage.jpg',
        asset_type: 0,
        visible: true,
        approved: true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        artwork_id: 2
      },
      
      {
        title: 'Spanish Village English Audio',
        description:'English audio description',
        address: 'https://myweb.fsu.edu/sshamp/Prototype/SpanishVillageEng.mp3',
        asset_type: 1,
        visible: true,
        approved: true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        artwork_id: 2
      },

      {
        title: 'Spanish Village Spanish Audiio',
        description:'English audio description',
        address: 'https://myweb.fsu.edu/sshamp/Prototype/SpanishVillageSpn.mp3',
        asset_type: 1,
        visible: true,
        approved: true,
        approved_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        artwork_id: 2
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

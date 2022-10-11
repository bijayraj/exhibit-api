'use strict';
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync('admin123', 10);
    const vToken = crypto.randomBytes(40).toString('hex');
    const vToken2 = crypto.randomBytes(40).toString('hex');
    const vToke3 = crypto.randomBytes(40).toString('hex');

    await queryInterface.bulkInsert('Users', [{
      username: 'bijaybzzay@gmail.com',
      password: password,
      first_name: 'ArtistBijay',
      last_name: 'Paudel',
      occupation: 'Student',
      organization: 'SIU',
      role: 'Artist',
      verification_token: vToken,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: 'bijayraj.paudel@siu.edu',
      password: password,
      first_name: 'AdminBijay',
      last_name: 'Paudel',
      occupation: 'Student',
      organization: 'SIU',
      role: 'Admin',
      verification_token: vToken2,
      created_at: new Date(),
      updated_at: new Date()
    }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

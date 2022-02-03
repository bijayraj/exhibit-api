'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {


        // await queryInterface.bulkInsert('Exercises', [{
        //     title: 'Humming',
        //     sub_title: 'mmmmmmm',
        //     details: 'Keep a long face (closed lips & open jaw). Use comfortable pitch. You can also glide-up and down within a comfortable range and hum portions of favorite or recitable tunes such as ‘Happy birthday to you’ for example.',
        //     image_url: 'https://www.wikihow.com/images/thumb/a/a7/Exercise-Your-Voice-Step-6-Version-2.jpg/aid29483-v4-728px-Exercise-Your-Voice-Step-6-Version-2.jpg.webp',
        //     created_at: new Date(),
        //     updated_at: new Date()
        // },
        // {
        //     title: 'Lip Trills',
        //     sub_title: 'brrrrrrrrrrrrr',
        //     details: 'Vibrate your lips together. Use a steady comfortable pitch as well as sliding up and down. Applying gentle finger support on cheeks can be really helpful.',
        //     image_url: 'https://www.wikihow.com/images/thumb/6/62/Exercise-Your-Voice-Step-3-Version-2.jpg/aid29483-v4-728px-Exercise-Your-Voice-Step-3-Version-2.jpg.webp',
        //     created_at: new Date(),
        //     updated_at: new Date()
        // },
        // ], {});
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    },

    down: async (queryInterface, Sequelize) => {
        // await queryInterface.bulkDelete('Exercises', [{

        // }], {});
    
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    }
};

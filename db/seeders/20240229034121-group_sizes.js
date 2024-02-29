"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "group_sizes",
      [
        {
          size: "2 to 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          size: "4 to 6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          size: "6 to 8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          size: "More than 8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("group_sizes", null, {});
  },
};

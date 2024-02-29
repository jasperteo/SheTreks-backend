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
      "locations",
      [
        {
          country: "Malaysia",
          city: "Kuala Lumpur",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Malaysia",
          city: "Penang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Vietnam",
          city: "Ho Chi Minh City",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Vietnam",
          city: "Hanoi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: "Singapore",
          city: "Singapore",
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
    await queryInterface.bulkDelete("locations", null, {});
  },
};

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
      "categories",
      [
        {
          categoryName: "Food and Culinary Experiences",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Outdoor Adventures and Nature",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Cultural Exploration and Heritage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Adventure Sports and Recreation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Wellness and Relaxation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Urban Exploration and City Tours",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Photography and Sightseeing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Nightlife and Events",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryName: "Special Interest and Niche Experiences",
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
    await queryInterface.bulkDelete("categories", null, {});
  },
};

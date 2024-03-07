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
      "notification_types",
      [
        {
          notifTypeName: "Join request",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "has approved your request to join",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "has declined your request to join",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "has withdrawn from ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "has cancelled the ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "starts to follow you.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "You have messages in",
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
    await queryInterface.bulkDelete("notification_types", null, {});
  },
};

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
          notifTypeName: "Join event request submitted.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "Approved participation request.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "Declined participation request.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "Following request submitted.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "Following request approved.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "Event cancelled.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          notifTypeName: "Unread messages.",
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

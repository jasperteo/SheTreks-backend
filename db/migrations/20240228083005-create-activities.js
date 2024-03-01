"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("activities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hostId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      cost: {
        type: Sequelize.INTEGER,
      },
      locationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "locations",
          key: "id",
        },
      },
      address: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.REAL,
      },
      longtitude: {
        type: Sequelize.REAL,
      },
      eventDate: {
        type: Sequelize.DATE,
      },
      groupSizeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "group_sizes",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("activities");
  },
};

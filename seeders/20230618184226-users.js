"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "A",
          info: "info a",
          number: "000000",
          userTypeId: 1,
          points: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "B",
          info: "info b",
          number: "111111",
          userTypeId: 2,
          points: 25,
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
  },
};

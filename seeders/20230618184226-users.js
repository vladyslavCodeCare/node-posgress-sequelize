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
          user_type_id: 1,
          points: 100,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "B",
          info: "info b",
          number: "111111",
          user_type_id: 2,
          points: 25,
          created_at: new Date(),
          updated_at: new Date(),
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

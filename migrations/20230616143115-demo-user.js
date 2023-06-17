"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      info: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.STRING,
      },
      userTypeId: {
        type: Sequelize.INTEGER,
        references: { model: "user_types", key: "id" },
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");

    /**
     * Add reverting commands here.
     *
     * Example:
     */
  },
};

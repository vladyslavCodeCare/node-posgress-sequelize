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
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      info: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      userTypeId: {
        type: Sequelize.INTEGER,
        references: { model: "user_types", key: "id" },
        allowNull: false,
      },
    });
    await queryInterface.addIndex("users", ["name"]);
    await queryInterface.addIndex("users", ["userTypeId"]);
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

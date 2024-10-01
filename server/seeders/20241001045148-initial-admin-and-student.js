"use strict";
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Students",
      [
        {
          firstName: "Jane",
          middleName: "",
          lastName: "Doe",
          password: await hashPassword("1234"),
          association: "SEA",
          studentCode: "HAU-0001",
          birthday: new Date(2000, 6, 20),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Students", null, {});
  },
};

"use strict";

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
    return queryInterface.bulkInsert("Users", [
      {
        username: "John",
        firstname: "Doe",
        email: "john.doe@example.com",
        password: "johndoe123",
        bio: "software developer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "masood",
        firstname: "ahmadi",
        email: "masood@example.com",
        password: "123456",
        bio: "software developer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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

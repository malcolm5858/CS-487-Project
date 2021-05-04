"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Doe",
          email: "email@email.com",
          Username: "JJ",
          Password: "asdasda",
          Address: "202 aa",
          Country: "USA",
          State: "MI",
          zip: "48009",
          NameOnCard: "John doe",
          CardNumber: "231231231231",
          Expiration: "asdasda",
          cvv: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "BOB",
          lastName: "Doe",
          email: "email@email.com",
          Username: "BD",
          Password: "asdasda",
          Address: "202 aa",
          Country: "USA",
          State: "MI",
          zip: "48009",
          NameOnCard: "bob doe",
          CardNumber: "231231231231",
          Expiration: "asdasda",
          cvv: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

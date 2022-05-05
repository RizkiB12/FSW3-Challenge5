'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert("Cars", [
      {
        name: "Avanza",
        type: "Home Car",
        price: "450000",
        image: "https://toyotamedandealer.com/wp-content/uploads/2021/02/new-kijang-inova-medan.png",
        size: "Medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Xenia",
        type: "Home Car",
        price: "450000",
        image: "https://toyotamedandealer.com/wp-content/uploads/2021/02/new-kijang-inova-medan.png",
        size: "Medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Innova",
        type: "Home Car",
        price: "600000",
        image: "https://toyotamedandealer.com/wp-content/uploads/2021/02/new-kijang-inova-medan.png",
        size: "Medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }

};

'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // addColumn
    await queryInterface.addColumn('band', 'recommendation', {
      type: DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    // removeColumn
    await queryInterface.removeColumn('band', 'recommendation')
  }
};

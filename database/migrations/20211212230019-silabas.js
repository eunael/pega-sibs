'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return await queryInterface.createTable('silabas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vogal_a: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      vogal_e: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      vogal_i: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      vogal_o: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      vogal_u: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

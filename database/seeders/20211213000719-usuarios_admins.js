'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkDelete('usuarios_admins', null, {});

    return await queryInterface.bulkInsert('usuarios_admins', [
      {
        name: 'natanael',
        email: 'n.morais@gescolar.ifrn.edu.br',
        password: '12345678',
      },
      {
        name: 'ariane',
        email: 'ariane.c@escolar.ifrn.edu.br',
        password: '12345678',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete('usuarios_admins', null, {});
  }
};

'use strict';

const todasSilabas = [
  ["BA", "BE", "BI", "BO", "BU"],
  ["CA", "CE", "CI", "CO", "CU"],
  ["DA", "DE", "DI", "DO", "DU"],
  ["FA", "FE", "FI", "FO", "FU"],
  ["GA", "GE", "GI", "GO", "GU"],
  ["HA", "HE", "HI", "HO", "HU"],
  ["JA", "JE", "JI", "JO", "JU"],
  ["KA", "KE", "KI", "KO", "KU"],
  ["LA", "LE", "LI", "LO", "LU"],
  ["MA", "ME", "MI", "MO", "MU"],
  ["NA", "NE", "NI", "NO", "NU"],
  ["PA", "PE", "PI", "PO", "PU"],
  ["QUA", "QUE", "QUI", "QUO", null],
  ["RA", "RE", "RI", "RO", "RU"],
  ["SA", "SE", "SI", "SO", "SU"],
  ["TA", "TE", "TI", "TO", "TU"],
  ["VA", "VE", "VI", "VO", "VU"],
  ["XA", "XE", "XI", "XO", "XU"],
  ["ZA", "ZE", "ZI", "ZO", "ZU"],
]

const campos = ["vogal_a", "vogal_e", "vogal_i", "vogal_o", "vogal_u"]

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

    await queryInterface.bulkDelete('silabas', null, {})

    let array_inserts = []

    todasSilabas.forEach(cons => {
      let registro = {}
      campos.forEach((cmp, idx) => [
        registro[cmp] = cons[idx]
      ])

      array_inserts.push(registro)
    })

    return await queryInterface.bulkInsert('silabas', array_inserts);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete('silabas', null, {});
  }
};

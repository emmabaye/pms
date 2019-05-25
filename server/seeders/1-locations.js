'use strict';

const Model = require('../models');

const { Location } = Model;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert(
      'Locations',
      [
        {
          id: "1",
          name: "Earth",
          malePopulation: "3868358699",
          femalePopulation: "3800750379",
          totalPopulation: "7669109078",
          parentLocationId: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ], {}
    );
    const totalLocations = await Location.count();
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Locations_id_seq" RESTART WITH ${totalLocations + 1}`);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Location')
};

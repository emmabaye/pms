module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    malePopulation: {
      type: Sequelize.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    femalePopulation: {
      type: Sequelize.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    totalPopulation: {
      type: Sequelize.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    parentLocationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      allowNull: true,
      onDelete: 'set null',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Locations'),
};

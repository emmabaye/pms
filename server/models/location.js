
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    malePopulation: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    femalePopulation: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    totalPopulation: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
  });
  Location.associate = (models) => {
    Location.hasMany(models.Location, {
      foreignKey: 'parentLocationId',
      as: 'childLocations'
    });
  };
  return Location;
};

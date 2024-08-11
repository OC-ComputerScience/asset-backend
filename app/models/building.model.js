module.exports = (sequelize, Sequelize) => {
  const Building = sequelize.define(
    "building",
    {
      buildingId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      abbreviation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      function: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      yearBuilt: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      squareFeet: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numStories: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      hasElevator: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      hasFireMonitor: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      hasSmokeAlarm: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fireSmokeNotes: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      constructionType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roofType: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      buildingValue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      buildingBPP: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      renovationNotes: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      activeStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Building;
};

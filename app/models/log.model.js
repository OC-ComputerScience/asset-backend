module.exports = (sequelize, Sequelize) => {
  const Log = sequelize.define(
    "log",
    {
      logId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      serializedAssetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "serializedAsset",
          key: "serializedAssetId",
        },
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      serviceDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      performedBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isPreventative: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isRepair: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isUpgrade: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Log;
};

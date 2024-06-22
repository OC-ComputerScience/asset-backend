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
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serviceDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      scheduledDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      performedBy: {
        type: Sequelize.STRING,
        allowNull: true,
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

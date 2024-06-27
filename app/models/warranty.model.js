module.exports = (sequelize, Sequelize) => {
  const Warranty = sequelize.define(
    "warranty",
    {
      warrantyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      warrantyDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      warrantyNotes: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      length: {
        type: Sequelize.INTEGER,
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
  return Warranty;
};

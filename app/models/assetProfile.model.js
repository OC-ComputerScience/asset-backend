module.exports = (sequelize, Sequelize) => {
  const AssetProfile = sequelize.define(
    "assetProfile",
    {
      profileId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      profileName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      purchasePrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      acquisitionDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      warrantyStartDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      warrantyEndDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      warrantyNotes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "assetType",
          key: "typeId",
        },
      },
      activeStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return AssetProfile;
};

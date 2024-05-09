module.exports = (sequelize, Sequelize) => {
  const SerializedAsset = sequelize.define(
    "serializedAsset",
    {
      serializedAssetId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      serialNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "assetProfile",
          key: "profileId",
        },
      },
      purchasePrice: {
        type: Sequelize.DECIMAL(10, 2), // Adjust decimal precision as needed
        allowNull: true,
      },
      acquisitionDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      activeStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      serializedAssetName: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${this.get("assetProfile")?.profileName} (${
            this.serialNumber
          })`;
        },
        // Note: Since it's a virtual field, no setter is defined
      },
      checkoutStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      disposalMethod: {
        type: Sequelize.ENUM('Sold', 'Scrapped', 'Donated', 'Recycled', 'Other'),
        allowNull: true,
      },
      disposalNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      disposalDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      disposalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true, // This allows the field to be optional
      },
    },

    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return SerializedAsset;
};

module.exports = (sequelize, Sequelize) => {
  const PersonAsset = sequelize.define(
    "personAsset",
    {
      personAssetId: {
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
      personId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "person",
          key: "personId",
        },
      },
      checkoutDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      expectedCheckinDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      checkinDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      checkoutStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      checkedOutBy: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      checkedInBy: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      checkoutNote: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      checkinNote: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return PersonAsset;
};

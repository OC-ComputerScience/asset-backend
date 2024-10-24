module.exports = (sequelize, Sequelize) => {
  const RoomAsset = sequelize.define(
    "roomAsset",
    {
      roomAssetId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      serializedAssetId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "serializedAsset",
          key: "serializedAssetId",
        },
      },
      roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "room",
          key: "roomId",
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
      timestamps: false,
      freezeTableName: true,
    }
  );
  return RoomAsset;
};

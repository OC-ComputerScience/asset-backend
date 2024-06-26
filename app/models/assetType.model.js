module.exports = (sequelize, Sequelize) => {
  const AssetType = sequelize.define(
    "assetType",
    {
      typeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      typeName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "assetCategory",
          key: "categoryId",
        },
      },
      desc: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      activeStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      dynamicFields: {
        type: Sequelize.JSON,
        allowNull: true,
      },
    },

    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return AssetType;
};

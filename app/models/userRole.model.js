module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define(
    "userRole",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique across all records
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {     //i am against doing security this way - s
          model: "assetCategory",
          key: "categoryId",
        },
      },
      defaultCanAdd: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      defaultCanEdit: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      defaultCanArchive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      defaultCanActivate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      defaultCanDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      defaultCanManageMaintenance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      defaultCanManageWarranties: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      defaultCanManageLeases: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return UserRole;
};

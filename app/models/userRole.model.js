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
      canAdd: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canEdit: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canArchive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canActivate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewCheckOutIn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewServices: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewMaintenance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewWarranties: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewLeases: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewReports: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewManage: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewAssets: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewFacilities: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewPeople: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      viewUsers: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isManager: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isWorker: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isUnassigned: {
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

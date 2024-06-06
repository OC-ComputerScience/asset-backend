module.exports = (sequelize, Sequelize) => {
  const ProfileData = sequelize.define(
    "profileData",
    {
      profileDataId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return ProfileData;
};


// Love, Zane (I edited it)
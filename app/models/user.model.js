module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fullName: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${this.fName} ${this.lName}`;
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique across all records
      },
      devPermission: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Most users won't have dev permissions by default
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return User;
};

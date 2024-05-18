module.exports = (sequelize, Sequelize) => {
    const CustomFieldType = sequelize.define(
        "customFieldType",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            }
        }
    );
    return CustomFieldType;
};
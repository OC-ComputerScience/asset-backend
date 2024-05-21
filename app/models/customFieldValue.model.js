module.exports = (sequelize, Sequelize) => {
    const CustomFieldValue = sequelize.define(
        "customFieldValue",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            value: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }
    );
    return CustomFieldValue;
};
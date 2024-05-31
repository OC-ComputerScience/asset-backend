module.exports = (sequelize, Sequelize) => {
    const CustomFieldType = sequelize.define(
        "customFieldType",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            required: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            identifier: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
        }
    );
    return CustomFieldType;
};
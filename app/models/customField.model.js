module.exports = (sequelize, Sequelize) => {
    const CustomField = sequelize.define(
        'customField',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }
    );
    return CustomField;
};
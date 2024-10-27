module.exports = (sequelize, Sequelize) => {
    const UserUserRole = sequelize.define(
        "userUserRole",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        }
    )
    return UserUserRole
}
module.exports = (sequelize, DataTypes) => {
    const UserAdmin = sequelize.define('usuarios_admins', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    return UserAdmin;
}
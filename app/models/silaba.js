module.exports = (sequelize, DataTypes) => {
    const Silaba = sequelize.define('silabas', {
        vogal_a: DataTypes.STRING,
        vogal_e: DataTypes.STRING,
        vogal_i: DataTypes.STRING,
        vogal_o: DataTypes.STRING,
        vogal_u: DataTypes.STRING,
    });

    return Silaba;
}
module.exports = (sequelize, DataTypes) => {
    const Palavra = sequelize.define('palavras', {
        path: DataTypes.TEXT,
        ativo: DataTypes.BOOLEAN,
    });

    return Palavra;
}
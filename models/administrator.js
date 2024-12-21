const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("administrator", {
        id_administrator: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_administrator: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password_administrator: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name_administrator: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        role_administrator: {
            type: DataTypes.STRING(50),
            defaultValue: "root",
            allowNull: false
        }
    },
    {
        tableName: "administrator"
    });
};
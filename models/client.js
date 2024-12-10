const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("client", {
        id_client: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_client: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password_client: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name_client: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        phone_number_client: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        tableName: "client"
    });
};
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("confirmation", {
        id_confirmation: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_invitation: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model: "invitation",
                key: "id_invitation"
            },
            onUpdate: "CASCADE", // Actualiza en cascada si cambia en la tabla padre
            onDelete: "SET NULL" // Establece a NULL si se elimina en la tabla padre
        },
        name_confirmation: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        phone_number_confirmation: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        attendance: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        attendance_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: "confirmation"
    });
};
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("invitation", {
        id_invitation: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_client: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "client", // Nombre de la tabla relacionada
                key: "id_client" // Clave primaria de la tabla clients
            },
            onUpdate: "CASCADE", // Actualiza en cascada si cambia en la tabla padre
            onDelete: "SET NULL" // Establece a NULL si se elimina en la tabla padre
        },
        id_plan: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "plan", // Nombre de la tabla relacionada
                key: "id_plan" // Clave primaria de la tabla plan
            },
            onUpdate: "CASCADE", // Actualiza en cascada si cambia en la tabla padre
            onDelete: "SET NULL" // Establece a NULL si se elimina en la tabla padre
        },
        name_invitation: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        codeHtml: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: "invitation"
    });
};
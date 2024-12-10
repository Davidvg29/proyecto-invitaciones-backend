const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("plan", {
        id_plan: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name_plan: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        price_plan: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tableName: "plan"
    });
};
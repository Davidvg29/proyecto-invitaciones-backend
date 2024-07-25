const {DataTypes} = require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define("Invitacion", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        user:{
            type:DataTypes.STRING,
            allowNull: false},
        htmlContent: {
            type: DataTypes.TEXT,
            allowNull: false},
    },
    {timestamps: false}
    )
}
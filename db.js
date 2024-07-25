const { Sequelize } = require('sequelize');

const Invitacion = require("./models/Invitacion")

const sequelize = new Sequelize(
    // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    `postgres://postgres:admin@localhost/proyecto_invitacions`,
    // DB_DEPLOY,
    {logging:false}
)

Invitacion(sequelize)

module.exports = {
    ...sequelize.models, 
    db: sequelize,     
  };
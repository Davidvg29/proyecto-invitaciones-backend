require("dotenv").config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME

const { Sequelize } = require('sequelize');

// const Invitacion = require("./models/Invitacion")

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    // `postgres://postgres:admin@localhost/proyecto_invitacions`,
    // DB_DEPLOY,
    {logging:false}
)

// Invitacion(sequelize)

module.exports = {
    ...sequelize.models, 
    db: sequelize,     
  };
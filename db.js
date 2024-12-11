require("dotenv").config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME

const { Sequelize } = require('sequelize');

const administrator = require("./models/administrator")
const invitation = require("./models/invitation")
const client = require("./models/client")
const plan = require("./models/plan")
const confirmation = require("./models/confirmation")

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    // `postgres://postgres:admin@localhost/proyecto_invitacions`,
    // DB_DEPLOY,
    {logging:false}
)

// Registrar los modelos en Sequelize
const models = {};
models.Administrator = administrator(sequelize);
models.Client = client(sequelize);
models.Plan = plan(sequelize);
models.Invitation = invitation(sequelize);
models.Confirmation = confirmation(sequelize);

//client 1:n invitation
//invitation n:1 client
models.Client.hasMany(models.Invitation, { foreignKey: "id_client" })
models.Invitation.belongsTo(models.Client, { foreignKey: "id_client" })

//invitation 1:n plan
//plan n:1 invitation
models.Invitation.hasMany(models.Plan, { foreignKey: "id_plan" })
models.Plan.belongsTo(models.Invitation, { foreignKey: "id_plan" })

//invitation 1:n confirmation
//confirmation n:1 invitation
models.Invitation.hasMany(models.Confirmation, { foreignKey: "id_invitation" })
models.Confirmation.belongsTo(models.Invitation, { foreignKey: "id_invitation" })

console.log(sequelize.models)

module.exports = {
    ...sequelize.models, 
    db: sequelize,     
  };
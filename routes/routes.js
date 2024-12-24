const Router = require("express")

const createPlan = require("../controllers/plan_controllers/createPlan")
const updatePlan = require("../controllers/plan_controllers/updatePlan")
const getAllPlan = require("../controllers/plan_controllers/getAllPlan")
const deletePlan = require("../controllers/plan_controllers/deletePlan")

const getAllClient = require("../controllers/client_controllers/getAllClient")
const createClient = require("../controllers/client_controllers/createClient")
const updateClient = require("../controllers/client_controllers/updateClient")
const deleteClient = require("../controllers/client_controllers/deleteClient")

const getAllInvitation = require("../controllers/invitation_controllers/getAllInvitations")
const createInvitation = require("../controllers/invitation_controllers/createInvitation")
const updateInvitation = require("../controllers/invitation_controllers/updateInvitation")
const getNameInvitation = require("../controllers/invitation_controllers/getNameInvitation")

const getAllConfirmationByInvitationId = require("../controllers/confirmation_controllers/getAllConfirmationByInvitationId")
const createConfirmation = require("../controllers/confirmation_controllers/createConfirmation")
const deleteConfirmation = require("../controllers/confirmation_controllers/deleteConfirmation")
const createAdministrator = require("../controllers/administrator_controllers/createAdministrator")
const authAdministrator = require("../controllers/administrator_controllers/authAdministrator")
const authClient = require("../controllers/client_controllers/authClient")

const router = Router()

// ------plan-----
router.post("/plan", createPlan)
router.put("/plan/:id", updatePlan)
router.get("/plan", getAllPlan)
router.delete("/plan/:id", deletePlan)

// -----client-----
router.get("/client", getAllClient)
router.post("/client", createClient)
router.post("/client/auth", authClient)
router.put("/client/:id", updateClient)
router.delete("/client/:id", deleteClient)

//------invitation------
router.get("/invitation", getAllInvitation)
router.post("/invitation", createInvitation)
router.put("/invitation/:id", updateInvitation)
router.get("/invitation/:name", getNameInvitation)

//------confirmation------
router.get("/confirmation/:id", getAllConfirmationByInvitationId)
router.post("/confirmation", createConfirmation)
router.delete("/confirmation/:id", deleteConfirmation)

//------administrator------
router.post("/administrator", createAdministrator)
router.post("/administrator/auth", authAdministrator)

module.exports = router
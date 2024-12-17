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

const router = Router()

// ------plan-----
router.post("/plan", createPlan)
router.put("/plan/:id", updatePlan)
router.get("/plan", getAllPlan)
router.delete("/plan/:id", deletePlan)

// -----client-----
router.get("/client", getAllClient)
router.post("/client", createClient)
router.put("/client/:id", updateClient)
router.delete("/client/:id", deleteClient)

//------invitation------
router.get("/invitation", getAllInvitation)
router.post("/invitation", createInvitation)

module.exports = router
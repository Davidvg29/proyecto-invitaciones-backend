const Router = require("express")

const createPlan = require("../controllers/plan_controllers/createPlan")
const updatePlan = require("../controllers/plan_controllers/updatePlan")
const getAllPlan = require("../controllers/plan_controllers/getAllPlan")
const deletePlan = require("../controllers/plan_controllers/deletePlan")

const router = Router()

router.post("/plan", createPlan)
router.put("/plan/:id", updatePlan)
router.get("/plan", getAllPlan)
router.delete("/plan/:id", deletePlan)

module.exports = router
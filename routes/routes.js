const Router = require("express")

const postInvitacion = require("../controllers/postInvitacion")
const getInvitacion = require("../controllers/getInvitacion")

const router = Router()

router.post("/createInvitacion", postInvitacion)
router.get("/getInvitacion", getInvitacion)

module.exports = router
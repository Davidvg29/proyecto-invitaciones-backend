const Router = require("express")

const postInvitacion = require("../controllers/postInvitacion")
const getInvitacion = require("../controllers/getInvitacion")
const getAllInvitacions = require("../controllers/getAllInvitacions")

const router = Router()

router.post("/createInvitacion", postInvitacion)
router.get("/getInvitacion", getInvitacion)
router.get("/getAllInvitacions", getAllInvitacions)

module.exports = router
const {confirmation, invitation} = require("../../db")

const getAllConfirmationByInvitationId = async(req, res)=>{
    const {id} = req.params
    try {
        const searchInvitation = await invitation.findByPk(id)
        if(!searchInvitation){
            return res.status(404).json({
                message: "No se encuentra invitacion con el id proporcionado"
            })
        }

        const confirmations = await confirmation.findAll({
            where: {
                id_invitation: id
            }
        })
            res.status(200).json({confirmations})
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todos los confirmados",
            error: error.message
        })
    }
}
module.exports = getAllConfirmationByInvitationId
const {invitation} = require("../../db")

const getAllInvitation = async(req, res)=>{
    try {
        const allInvitations = await invitation.findAll()
        if(allInvitations.length === 0){
            res.status(404).json({
                message: "No se encontraron invitaciones"
            })
        }
        return res.status(200).json(allInvitations)
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todas las invitaciones",
            error: error.message
        })
    }
}
module.exports = getAllInvitation
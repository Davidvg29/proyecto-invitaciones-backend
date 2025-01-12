const {invitation, confirmation} = require("../../db")

const getDetailInvitation = async (req, res) => {
    const { id } = req.params
    try {
        const invitationSearch = await invitation.findByPk(id,{
            include:[
                {model: confirmation}
            ]
        })
        if(!invitationSearch){
            res.status(404).json({
                message:"Invitacion no encontrada"
            })
        }
        res.status(200).json(invitationSearch)
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener detalles de invitación",
            error: error.message
        })
    }
}
module.exports = getDetailInvitation
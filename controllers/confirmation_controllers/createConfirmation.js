const {confirmation, invitation} = require("../../db")
const validationCreateConfirmation = require("./validation/validationCreateConfirmation")

const createConfirmation = async(req, res)=>{
    const {id_invitation, name_confirmation, phone_number_confirmation, attendance} = req.body
    try {
        const validation = validationCreateConfirmation(id_invitation, name_confirmation, phone_number_confirmation, attendance)
        if(validation !== false){
            return res.status(400).json({validation})
        }

        const searchInvitation = await invitation.findByPk(id_invitation)
        if(!searchInvitation){
            return res.status(404).json({
                message: "No se encuentra invitacion con el id proporcionado"
            })
        }

        const [confirmationFind, created] = await confirmation.findOrCreate({
            where: {name_confirmation: name_confirmation},
            defaults: {
                id_invitation: id_invitation,
                name_confirmation: name_confirmation,
                phone_number_confirmation: phone_number_confirmation,
                attendance: attendance
            }
        })
        if(created){
            return res.status(200).json({
                created: true,
                message: "Confirmacion creada con exito",
                confirmation: confirmationFind.name_confirmation,
                attendance: confirmationFind.attendance
            })
        }else{
            return res.status(200).json({
                message: "Confirmacion ya existe con este nombre",
                confirmation: confirmationFind.name_confirmation
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear una confirmacion",
            error: error.message
        })
    }
}
module.exports = createConfirmation
const {invitation} = require("../../db")
const validationCreateInvitation = require("./validation/validationCreateInvitation")

const createInvitation = async(req, res)=>{
    const {id_client, id_plan, name_invitation} = req.body
    try {
        const validation = validationCreateInvitation(id_client, id_plan, name_invitation)
        if(validation !== false){
            res.status(200).json({validation})
        }

        const [invitationFind, created] = await invitation.findOrCreate({
            where: {name_invitation: name_invitation},
            defaults: {
                id_client: id_client,
                id_plan: id_plan,
                name_invitation : name_invitation
            }
        })
        if(created){
            res.status(201).json({
                message: "Invitacion creada con exito",
                invitation: invitationFind
            })
        }else{
            res.status(200).json({
                message: "Invitacion ya existe, elija otro nombre",
                invitation: invitationFind.name_invitation
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Error al crear invitacion",
            error: error.message
        })
    }

}
module.exports = createInvitation
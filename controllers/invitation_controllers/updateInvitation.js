const {invitation, client, plan} = require("../../db")
const validationCreateInvitation = require("./validation/validationCreateInvitation")

const updateInvitation = async(req, res)=>{
    const {id} = req.params
    const {id_client, id_plan, name_invitation} = req.body
    try {
        const validation = validationCreateInvitation(id_client, id_plan, name_invitation)
        if(validation !== false){
            res.status(200).json({validation})
        }

        const clientExists = await client.findByPk(id_client)
        if(!clientExists){
            return res.status(404).json({
                message: `El cliente con id ${id_client} no existe.`
            })
        }

        const planExists = await plan.findByPk(id_plan)
        if(!planExists){
            return res.status(404).json({
                message: `El plan con id ${id_plan} no existe.`
            })
        }

        const updateInvitation = await invitation.update({
            id_client: id_client,
            id_plan: id_plan,
            name_invitation: name_invitation
        },{
            where: {id_invitation: id}, returning: true
        })
        const [updatedCount, updatedRows] = updateInvitation;
        if (updatedCount > 0) {
            return res.status(200).json({
                message: "Invitacion actualizada con éxito",
                plan: updatedRows[0]  // Devolver la invitacion actualizado
            });
        } else {
            return res.status(400).json({ message: "No se pudo actualizar la invitacion" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar invitacion",
            error: error.message
        })
    }
}
module.exports = updateInvitation
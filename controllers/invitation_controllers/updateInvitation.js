const {invitation, client, plan} = require("../../db")
const validationCreateInvitation = require("./validation/validationCreateInvitation")
const fs = require("fs").promises;
const path = require("path");

const updateInvitation = async(req, res)=>{
    const {id} = req.params
    const {id_client, id_plan, name_invitation, codeHtml} = req.body
    try {
        const validation = validationCreateInvitation(id_client, id_plan, name_invitation, codeHtml)
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
            name_invitation: name_invitation,
            codeHtml: codeHtml
        },{
            where: {id_invitation: id}, returning: true
        })
        const [updatedCount, updatedRows] = updateInvitation;
        if (updatedCount > 0) {
            try {
                const dirPath = path.join(__dirname, "../../public/invitations");
                const filePath = path.join(dirPath, `${name_invitation}.html`);
                await fs.mkdir(dirPath, { recursive: true });
                await fs.writeFile(filePath, codeHtml, "utf8");
                return res.status(201).json({
                    message: "Invitación actualizada con éxito",
                    invitation: updatedRows[0], //devuelve invitacion actualizada
                    file: `${name_invitation}.html`,
                });
            } catch (fileError) {
                return res.status(500).json({
                    message: "Invitación actualizada, pero no se pudo generar el archivo HTML",
                    error: fileError.message,
                });
            }
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
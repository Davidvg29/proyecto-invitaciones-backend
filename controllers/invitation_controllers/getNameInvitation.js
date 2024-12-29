const {invitation, client, plan} = require("../../db")
const fs = require("fs").promises
const path = require("path");

const getNameInvitation = async(req, res)=>{
    const {name} = req.params
    try {
        const searchInvitation = await invitation.findOne({
            where: {
                name_invitation : name
            }
        })
        if(searchInvitation){
            const filePath = path.join(__dirname, "../../public/invitations", `${name}.html`);
            try {
                await fs.access(filePath)
                res.setHeader("Content-Type", "text/html");
                res.status(200).sendFile(filePath)
            } catch (fileError) {
                res.status(404).json({
                    message: "El archivo de la invitacion no se encontro",
                    error: fileError.message
                })
            }
        }else{
            res.status(404).json({
                message: `No se encontro una invitacion con el nombre: ${name}`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener invtacion por nombre",
            error: error.message
        })
    }
}
module.exports = getNameInvitation
const {invitation} = require("../../db")

const getAllFilesInvitations = async(req, res)=>{
    try {
        const allInvitations = await invitation.findAll()
        if(allInvitations.length === 0){
            return res.status(404).json({
                message: "No se encontraron archivos de invitaciones"
            })
        }

        let files = []
        allInvitations.map((a)=>{
            files.push(`${a.name_invitation}`)
        })

        return res.status(200).json(files)
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los archivos de invitaciones",
            error: error.message
        })
    }
}
module.exports = getAllFilesInvitations
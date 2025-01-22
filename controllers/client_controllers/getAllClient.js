const {client, invitation, confirmation} = require("../../db")

const getAllClient = async(req, res)=>{
    try {
        const clients = await client.findAll({
            attributes: [
                 "id_client",
                 "user_client",
                 "name_client",
                 "phone_number_client",
                 "createdAt",
                 "updatedAt"
            ],
            include: [{
                model: invitation,
                attributes: [
                    "id_invitation",
                    "name_invitation"
                ],
                include:[{
                    model: confirmation
                }]
            }]
        })
        res.status(200).json({clients})
    } catch (error) {
        req.status(500).json({
            message: "Error a obtener todos los clientes",
            error: error.message
        })
    }
}   
module.exports = getAllClient
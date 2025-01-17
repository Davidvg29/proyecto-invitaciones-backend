const {client} = require("../../db")

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
            ]
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
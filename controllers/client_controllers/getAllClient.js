const {client} = require("../../db")

const getAllClient = async(req, res)=>{
    try {
        const clients = await client.findAll()
        res.status(200).json({clients})
    } catch (error) {
        req.status(500).json({
            message: "Error a obtener todos los clientes",
            error: error.message
        })
    }
}   
module.exports = getAllClient
const {client} = require("../../db")

const createClient = async(req, res)=>{
    const {user_client, password_client, name_client, phone_number_client} = req.body

    try {
        const validation = validation(user_client, password_client, name_client, phone_number_client)
        if()

    } catch (error) {
        res.status(500).json({
            message: "Error al crear un cliente",
            error: error.message
        })
    }
}
module.exports = createClient
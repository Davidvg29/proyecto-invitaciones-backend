const {client} = require("../../db")
const validationCreateClient = require("./validation/validationCreateClient")

const createClient = async(req, res)=>{
    const {user_client, password_client, name_client, phone_number_client} = req.body

    try {
        const validation = validationCreateClient(user_client, password_client, name_client, phone_number_client)
        if(validation !== false){
           return res.status(400).json({validation})
        }

        const createClient = await client.findOrCreate()

    } catch (error) {
        res.status(500).json({
            message: "Error al crear un cliente",
            error: error.message
        })
    }
}
module.exports = createClient
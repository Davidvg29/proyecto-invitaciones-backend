const {client} = require("../../db")
const validationCreateClient = require("./validation/validationCreateClient")

const createClient = async(req, res)=>{
    const {user_client, password_client, name_client, phone_number_client} = req.body

    try {
        const validation = validationCreateClient(user_client, password_client, name_client, phone_number_client)
        if(validation !== false){
           return res.status(400).json({validation})
        }

        const [clientFind, created] = await client.findOrCreate(({
            where: {user_client : user_client},
            defaults: {
                user_client: user_client,
                password_client: password_client,
                name_client: name_client,
                phone_number_client: phone_number_client
            }
        }))
        if(created){
            res.status(201).json({
                message: "Cliente creado exitosamente",
                client: clientFind.user_client
            })
        }else{
            res.status(200).json({
                message: "El usuario ya existe",
                client: clientFind.user_client
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Error al crear un cliente",
            error: error.message
        })
    }
}
module.exports = createClient
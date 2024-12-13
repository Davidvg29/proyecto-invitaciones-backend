const {client} = require("../../db")
const validationCreateClient = require("./validation/validationCreateClient")

const updateClient = async(req, res)=>{
    const {id} = req.params
    const {user_client, password_client, name_client, phone_number_client} = req.body

    try {
        const validation = validationCreateClient(user_client, password_client, name_client, phone_number_client)
        if(validation !== false){
           return res.status(400).json({validation})
        }

        const updateClient = await client.update({
            user_client: user_client,
            name_client: name_client, 
            password_client: password_client,
            name_client: name_client,
            phone_number_client: phone_number_client
        },{
            where: {id_client: id}, returning: true
        })
        const [updatedCount, updatedRows] = updateClient;
        if (updatedCount > 0) {
            return res.status(200).json({
                message: "Cliente actualizado con éxito",
                // plan: updatedRows[0]  // Devolver el cliente actualizado
            });
        } else {
            return res.status(400).json({ message: "No se pudo actualizar el cliente" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar cliente", 
            client: error.message
        })
    }
}
module.exports = updateClient
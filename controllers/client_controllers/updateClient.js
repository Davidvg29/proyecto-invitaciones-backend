const {client} = require("../../db")
const encryption = require("../../utils/crypto/encryption")
const validationCreateClient = require("./validation/validationCreateClient")

const updateClient = async(req, res)=>{
    const {id} = req.params
    const {user_client, password_client, name_client, phone_number_client} = req.body

    try {
        const validation = validationCreateClient(user_client, password_client, name_client, phone_number_client)
        if(validation !== false){
           return res.status(400).json({validation})
        }

        const searchClient = await client.findByPk(id)
        if(!searchClient){
            return res.status(404).json({
                message: "Cliente con este ID no existe",
                clienteID: id
            })
        }

        const resultEncryption = await encryption(password_client)
        if(typeof resultEncryption === "string"){
            const updateClient = await client.update({
                user_client: user_client,
                name_client: name_client, 
                password_client: resultEncryption,
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
        }else if(resultEncryption.error){
            return res.status(400).json({resultEncryption})
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar cliente", 
            client: error.message
        })
    }
}
module.exports = updateClient
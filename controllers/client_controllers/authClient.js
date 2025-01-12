const {client, invitation} = require("../../db")
const decryption = require("../../utils/crypto/decryption")
const validationAuthClient = require("./validation/validationAuthClient")

const authClient = async(req,res)=>{
    const {user_client, password_client} = req.body
    try {
        const validation = validationAuthClient(user_client, password_client)
        if(validation !== false){
            return res.status(200).json({
                success: false,
                message: "Usuario o contraseña incorrectos"
            })
        }

        const user = await client.findOne({
            where: {user_client: user_client},
            include:{
                model: invitation
            }
        })
        if(!user){
            return res.status(200).json({
                success: false,
                message: "Usuario o contraseña incorrectos"
            })
        }

        const isPasswordValid = await decryption(password_client, user.password_client)
        if(!isPasswordValid){
            return res.status(200).json({
                success: false,
                message: "Usuario o contraseña incorrectos"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Autenticacion exitosa",
            user:{
                id: user.id_client,
                name_client: user.name_client,
                phone_number_client: user.phone_number_client,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                invitations: user.invitations.map((invitation) => ({
                    id_invitation: invitation.id_invitation,
                    name_invitation: invitation.name_invitation,
                    createdAt: invitation.createdAt,
                  })),
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error al autenticar cliente",
            error: error.message
        })
    }
}
module.exports = authClient
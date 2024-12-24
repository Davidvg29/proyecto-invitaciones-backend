const {administrator} = require("../../db")
const decryption = require("../../utils/crypto/decryption")
const validationAuthAdministrator = require("./validation/validationAuthAdministrator")

const authAdministrator = async(req, res)=>{
    const {user_administrator, password_administrator} = req.body

    try {
        const validate = validationAuthAdministrator(user_administrator, password_administrator)
        if(validate !== false){
            return res.status(400).json({validate})
        }

        const user = await administrator.findOne({
            where: {user_administrator}
        }) 
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Usuario o contraseña incorrectos"
            })
        }

        const isPasswordValid = await decryption(password_administrator, user.password_administrator)
        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: "Usuario o contraseña incorrectos"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Autenticacion exitosa",
            user:{
                id: user.id_administrator,
                name_administrator: user.name_administrator,
                role_administrator: user.role_administrator,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al autenticar administrador",
            error: error.message
        })
    }
}
module.exports = authAdministrator
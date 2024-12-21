const {administrator} = require("../../db")
const validationCreateAdministrator = require("./validation/validationCreateAdministrator")
const encryption = require("../../utils/crypto/encryption")

const createAdministrator = async(req, res)=>{
    const {user_administrator, password_administrator, name_administrator, role_administrator} = req.body
    try {
        const validation = validationCreateAdministrator(user_administrator, password_administrator, name_administrator, role_administrator)
        if(validation !== false){
            return res.status(400).json({validation})
        }

        const role = role_administrator && role_administrator.trim() !== "" ? role_administrator : "root";
        const resultEncryption = await encryption(password_administrator)
        if(typeof resultEncryption === "string"){
            const [administratorFind, created] = await administrator.findOrCreate({
                where: {user_administrator: user_administrator},
                defaults: {
                    user_administrator: user_administrator,
                    password_administrator: resultEncryption,
                    name_administrator: name_administrator,
                    role_administrator: role
                }
            })
            if(created){
                return res.status(201).json({
                    message: "Usuario administrador creado con exito",
                    administrator: administratorFind.name_administrator
                })
            }else{
                return res.status(200).json({
                        message: "Usuario administrator existente",
                        administrator: administratorFind.name_administrator
                    })
            }
        }else if(resultEncryption.error){
            return res.status(400).json({resultEncryption})
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear un nuevo usuario administrator",
            error: error.message
        })
    }
}
module.exports = createAdministrator
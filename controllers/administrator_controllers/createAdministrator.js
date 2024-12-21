const {administrator} = require("../../db")

const createAdministrator = async(req, res)=>{
    const {user_administrator, password_administrator, name_administrator, role_administrator} = req.body
    try {
        
    } catch (error) {
        res.status(500).json({
            message: "Error al crear un nuevo usuario administrator",
            error: error.message
        })
    }
}
module.exports = createAdministrator
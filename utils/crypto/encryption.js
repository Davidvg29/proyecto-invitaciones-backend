const bcrypt = require("bcrypt")

module.exports = encryption = async(myPlaintextPassword)=>{
    try {
        const hash = await bcrypt.hash(myPlaintextPassword, 10)
        return hash
    } catch (error) {
        return {
            message:"Error al encriptar la contraseña",
            error: error.message
        }
    }
}
const bcrypt = require("bcrypt")

module.exports = decryption = async(someOtherPlaintextPassword, hash)=>{
    try {
        const compare = await bcrypt.compare(someOtherPlaintextPassword, hash)
        return compare
    } catch (error) {
        return {
            message: "Error al comparar contraseña",
            error: error.message
        }
    }
}
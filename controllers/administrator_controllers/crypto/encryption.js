const bcrypt = requrie("bcrypt")

module.exports = encryption = async(myPlaintextPassword)=>{
    try {
        const hash = await bcrypt.hash(myPlaintextPassword, 10)
        return hash
    } catch (error) {
        return {
            message:"Erro al encriptar la contraseña",
            error: error.message
        }
    }
}
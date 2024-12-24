module.exports = validationCreateClient=(user_client, password_client)=>{
    let error = {}

    if(!user_client || user_client.length < 3) error.user_client="Usuario de cliente debe contener minimo 3 caracteres"
    if(!password_client || password_client.length !== 6) error.password_client="Contraseña de cliente debe contener 6 caracteres"
    
    // Retorna false si no hay errores, o el objeto error si hay errores
    return Object.keys(error).length === 0 ? false : error
}
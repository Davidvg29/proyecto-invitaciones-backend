module.exports = validationCreateClient=(user_client, password_client, name_client, phone_number_client)=>{
    let error = {}

    if(!user_client || user_client.length < 3) error.user_client="Usuario de cliente debe contener minimo 3 caracteres"
    if(!password_client || password_client.length !== 6) error.password_client="Contraseña de cliente debe contener 6 caracteres"
    if(!name_client || name_client.length < 3) error.name_client="Nombre de cliente debe contener al menos 3 caracteres"
    if (!phone_number_client || !/^\+?\d{8,15}$/.test(phone_number_client)) error.phone_number_client = "El número de teléfono debe contener entre 8 y 15 dígitos, y puede comenzar con '+'";
    
    // Retorna false si no hay errores, o el objeto error si hay errores
    return Object.keys(error).length === 0 ? false : error
}
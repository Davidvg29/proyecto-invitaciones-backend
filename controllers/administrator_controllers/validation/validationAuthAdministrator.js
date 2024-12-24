module.exports = validationAuthAdministrator = (user_administrator, password_administrator)=>{
    error = {}

    const numberVerify = /\d/; //verifica si hay al menos un numero
    const uppercaseVerify = /[A-Z]/; //verifica si hay al menos una letra mayuscula

    if(!user_administrator || user_administrator.length < 3) error.user_administrator = "Usuario de administrador tiene que contener al menos 3 caracteres"
    if(!user_administrator || user_administrator.length > 20) error.user_administrator = "Usuario de administrador no puede contener mas de 20 caracteres"
    if(!password_administrator || password_administrator.length < 8) error.password_administrator = "Contraseña de administrator debe contener al menos 8 caracteres"
    if(!password_administrator || password_administrator.length > 20) error.password_administrator = "Contraseña de administrator no puede contener mas de 20 caracteres"
    if(!numberVerify.test(password_administrator)) error.password_administrator = "Contraseña debe tener al menos un numero"
    if(!uppercaseVerify.test(password_administrator)) error.password_administrator = "Contraseña debe tener al menos una letra mayuscula"

    return Object.keys(error).length === 0 ? false : error
}
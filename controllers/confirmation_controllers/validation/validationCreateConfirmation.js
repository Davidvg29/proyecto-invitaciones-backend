module.exports = validationCreateConfirmation=(id_invitation, name_confirmation, phone_number_confirmation, attendance)=>{
    let error = {}

    if(!id_invitation || isNaN(Number(id_invitation)) || !Number.isInteger(Number(id_invitation))) error.id_invitation = "Debe contener un ID de invitación válido (número entero positivo)"
    if(!name_confirmation || name_confirmation.length < 3) error.name_confirmation = "Nombre de confirmado debe tener al menos 3 caracteres"
    if(name_confirmation && name_confirmation.length > 25) error.name_confirmation = "Nombre de confirmado tiene que ser menos de 25 caracteres"
    // if(!phone_number_confirmation || !/^\+?\d{8,15}$/.test(phone_number_confirmation)) error.phone_number_confirmation = "El número de teléfono debe contener entre 8 y 15 dígitos, y puede comenzar con '+'"
    if(typeof attendance !== "boolean") error.attendance = "Asistencia debe ser valor booleano"

    // Retorna false si no hay errores, o el objeto error si hay errores
    return Object.keys(error).length === 0 ? false : error
}
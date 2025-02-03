module.exports = validationCreateInvitation = (id_client, id_plan, name_invitation, codeHtml)=>{
    let error = {}

    if(!id_client || isNaN(Number(id_client)) || !Number.isInteger(Number(id_client))) error.id_client = "ID cliente tiene que ser un numero entero"
    if(!id_plan || isNaN(Number(id_plan)) || !Number.isInteger(Number(id_plan))) error.id_plan = "ID plan tiene que ser un numero entero"
    if(!name_invitation || name_invitation.length > 50) error.name_invitation = "Nombre de invitacion no puede contener mas de 50 caracteres"
    if(!name_invitation || name_invitation.length < 3 || name_invitation.length === 0) error.name_invitation = "Nombre de invitacion debe contener al menos 3 caracteres"
    if(!codeHtml) error.codeHtml = "Codigo HTML no puede estar vacio"

    // Retorna false si no hay errores, o el objeto error si hay errores
    return Object.keys(error).length === 0 ? false : error
}

const {Invitacion} = require("../db")

const getAllInvitacions = async(req, res)=>{
    try {
        
        const getAllInvitaciones = await Invitacion.findAll({attributes: ['user']})

        if(getAllInvitaciones){
            // console.log(getAllInvitaciones)
            res.status(200).json(getAllInvitaciones)
        }

    } catch (error) {
        res.status(500).json("error a obtener todas las invitaciones", error)
    }
}
module.exports = getAllInvitacions
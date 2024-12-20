const {confirmation} = require("../../db")

const deleteConfirmation = async(req, res)=>{
    const {id} = req.params
    try {
        const searchConfirmation = await confirmation.findByPk(id) 
        if(!searchConfirmation)
        return res.status(404).json({
            message: "Confirmacion no encontrada"
        })

        const deleteConfirmation = await confirmation.destroy({
            where: {
                id_confirmation: id
            }
        })
        if (deleteConfirmation > 0) {
            res.status(200).json({ 
                message: "Confirmacion eliminada con éxito", 
                confirmation: searchConfirmation 
            });
        } else {
            res.status(404).json({ 
                message: "No se pudo eliminar confirmacion" 
            });
        } 
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar una confirmacion",
            error: error.message
        })
    }
}
module.exports = deleteConfirmation
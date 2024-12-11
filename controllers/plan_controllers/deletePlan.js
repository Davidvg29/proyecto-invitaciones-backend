const {plan} = require("../../db")

const deletePlan = async(req, res)=>{
    const {id} = req.params
    try {
        const planToDelete = await plan.findOne({
            where: { id_plan: id }
        });
        if (!planToDelete) {
            return res.status(404).json({
                message: "Plan no encontrado"
            });
        }

        const deletePlan = await plan.destroy({
            where: {
                id_plan: id
            }
        })
        if (deletePlan > 0) {
            res.status(200).json({ 
                message: "Plan eliminado con éxito", 
                plan: planToDelete 
            });
        } else {
            res.status(404).json({ 
                message: "No se pudo eliminar el plan" 
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Error al borrar un plan",
            error: error.message
        })
    }
}
module.exports = deletePlan
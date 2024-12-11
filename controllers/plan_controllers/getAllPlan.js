const {plan} = require("../../db")

const getAllPlan = async(req, res)=>{
    try {
        const allPlans = await plan.findAll()
        if(allPlans.length === 0){
            return res.status(404).json({
                message: "No se encontraron planes"
            })
        }
        return res.status(200).json(allPlans)
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todos los planes",
            error: error.message
        })
    }
}
module.exports = getAllPlan
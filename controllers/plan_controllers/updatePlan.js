const {plan} = require("../../db")

const updatePlan = async(req, res)=>{
    const {id} = req.params
    const {name_plan, price_plan} = req.body
    try {
        if(!name_plan || !price_plan){
            return res.status(400).json({
                message: "Nombre y precio de plan son obligatorios"
            })
        }
        const price = parseFloat(price_plan); // Convierte a número
        if (isNaN(price)) { // Verifica si es un número válido
        return res.status(400).json({
            message: "El precio debe ser tipo numérico"
        });
        }
        const formattedPrice = price.toFixed(2);

        const updatedPlan = await plan.update({
            name_plan, 
            price_plan: formattedPrice
        },{
            where: {id_plan: id}, returning: true
        })
        const [updatedCount, updatedRows] = updatedPlan;
        if (updatedCount > 0) {
            return res.status(200).json({
                message: "Plan actualizado con éxito",
                plan: updatedRows[0]  // Devolver el plan actualizado
            });
        } else {
            return res.status(400).json({ message: "No se pudo actualizar el plan" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar plan",
            error: error.message
        })
    }
}
module.exports = updatePlan
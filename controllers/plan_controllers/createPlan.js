const {plan} = require("../../db")

const createPlan = async(req, res)=>{
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

        const formattedPrice = price.toFixed(2); // Formatea el precio a dos decimales

        const [planDB, created] = await plan.findOrCreate({
            where: {name_plan: name_plan},
            defaults: {
                name_plan: name_plan,
                price_plan: formattedPrice
            }
        })
        if(created){
            return res.status(201).json({
                message: "Plan creado exitosamente",
                planDB
            })
        }else{
            return res.status(200).json({
                message: "El plan ya existe",
                planDB
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Error al crear un nuevo plan", error: error.message
        })
    }

}
module.exports = createPlan
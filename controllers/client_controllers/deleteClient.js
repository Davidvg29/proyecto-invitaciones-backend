const {client} = require("../../db")

const deleteClient = async(req, res)=>{
    const {id} = req.params
    try {
        const clientToDelete = await client.findOne({
            where: { id_client: id }
        });
        if (!clientToDelete) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        const deleteClient = await client.destroy({
            where: {
                id_client: id
            }
        })
        if (deleteClient > 0) {
            res.status(200).json({ 
                message: "Cliente eliminado con éxito", 
                client: clientToDelete 
            });
        } else {
            res.status(404).json({ 
                message: "No se pudo eliminar el cliente" 
            });
        } 
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar cliente",
            error: error.message
        })
    }
}
module.exports = deleteClient
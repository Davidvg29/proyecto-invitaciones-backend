const fs = require("fs");
const path = require("path");
const { Invitacion } = require("../db");

const getInvitacion = async (req, res) => {
    
    const { invitacion } = req.query; 

    try {
        const invitacionData = await Invitacion.findOne({ where: { user: invitacion } });

        if (invitacionData) {
            const filePath = path.join(__dirname, '../', 'public', `invitacion-${invitacion}.html`);

            fs.access(filePath, fs.constants.F_OK, (error) => {
                if (error) {
                    console.error('Archivo no encontrado:', error);
                    return res.status(404).json({ error: 'Archivo no encontrado' });
                }

                res.sendFile(filePath, (error) => {
                    if (error) {
                        console.error('Error al enviar el archivo:', error);
                        res.status(500).json({ error: 'Error al enviar el archivo' });
                    }
                });
            });

        } else {
            res.status(404).json({ error: 'Invitación no encontrada' });
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        res.status(500).json({ error: 'Fallo al obtener invitación' });
    }
};

module.exports = getInvitacion;

const { invitation } = require("../../db");
const path = require("path");

const getNameInvitation = async (req, res) => {
    const { name } = req.params;
    try {
        const searchInvitation = await invitation.findOne({
            where: { name_invitation: name }
        });

        if (!searchInvitation) {
            return res.status(404).json({ message: `No se encontró una invitación con el nombre: ${name}` });
        }

        // Ruta absoluta del archivo
        const filePath = path.resolve(__dirname, "../../public/invitations", `${name}.html`);

        // Configurar encabezado de contenido
        res.setHeader("Content-Type", "text/html");

        // Enviar archivo directamente
        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(500).json({ message: "Error al enviar el archivo", error: err.message });
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error al obtener invitación por nombre", error: error.message });
    }
};

module.exports = getNameInvitation;

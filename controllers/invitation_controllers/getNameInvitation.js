const { invitation } = require("../../db");
const path = require("path");
const fs = require("fs").promises;

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
        // Leer el archivo HTML
        let htmlContent = await fs.readFile(filePath, "utf8");
        // Inyectar el ID dentro del HTML
        htmlContent = htmlContent.replace("{{id_invitation}}", searchInvitation.id_invitation);
        // Configurar encabezado de contenido
        res.setHeader("Content-Type", "text/html");

        // Enviar archivo directamente
        res.status(200).send(htmlContent)

    } catch (error) {
        res.status(500).json({ message: "Error al obtener invitación por nombre", error: error.message });
    }
};

module.exports = getNameInvitation;

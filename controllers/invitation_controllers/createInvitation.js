const { invitation, client, plan } = require("../../db");
const validationCreateInvitation = require("./validation/validationCreateInvitation");
const fs = require("fs").promises;
const path = require("path");

const createInvitation = async (req, res) => {
    const { id_client, id_plan, name_invitation, codeHtml } = req.body;

    try {
        const validation = validationCreateInvitation(id_client, id_plan, name_invitation, codeHtml);
        if (validation !== false) {
            return res.status(400).json({ validation });
        }

        const clientExists = await client.findByPk(id_client);
        if (!clientExists) {
            return res.status(404).json({ message: `El cliente con id ${id_client} no existe.` });
        }

        const planExists = await plan.findByPk(id_plan);
        if (!planExists) {
            return res.status(404).json({ message: `El plan con id ${id_plan} no existe.` });
        }

        const [invitationFind, created] = await invitation.findOrCreate({
            where: { name_invitation },
            defaults: { id_client, id_plan, name_invitation },
        });

        if (created) {
            try {
                const dirPath = path.join(__dirname, "../../public/invitations");
                const filePath = path.join(dirPath, `${name_invitation}.html`);
                await fs.mkdir(dirPath, { recursive: true });
                await fs.writeFile(filePath, codeHtml, "utf8");
                return res.status(201).json({
                    message: "Invitación creada con éxito",
                    invitation: invitationFind,
                    file: `${name_invitation}.html`,
                });
            } catch (fileError) {
                return res.status(500).json({
                    message: "Invitación creada, pero no se pudo generar el archivo HTML",
                    error: fileError.message,
                });
            }
        } else {
            return res.status(200).json({
                message: "La invitación ya existe, elija otro nombre",
                invitation: invitationFind.name_invitation,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear invitación",
            error: error.message,
        });
    }
};

module.exports = createInvitation;

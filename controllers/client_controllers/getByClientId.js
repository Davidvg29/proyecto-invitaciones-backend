const { client, invitation, confirmation, plan } = require("../../db");

const getByClientId = async (req, res) => {
  const { id } = req.params;
  try {
    const clientData = await client.findByPk(id, {
      attributes: [
        "id_client",
        "user_client",
        "name_client",
        "phone_number_client",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: invitation,
          include: [
            {
              model: confirmation,
            },
          ],
          include: [
            {
              model:plan
            }
          ]
        },
      ],
    });

    if (!clientData) {
      return res.status(404).json({ message: "No se encontró el cliente" });
    }

    return res.status(200).json({ client: clientData });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el cliente",
      error: error.message,
    });
  }
};

module.exports = getByClientId;

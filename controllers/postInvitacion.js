const {Invitacion} = require("../db")
const fs = require("fs")
const path = require("path")

const postInvitacion = async (req, res)=>{
    const {user, htmlContent} = req.body

    try {
        
        const  createInvitacion = await Invitacion.create({
            user: user,
            htmlContent: htmlContent
        })

        if(createInvitacion){
            const filePath = path.join(__dirname, '../public', `invitacion-${user}.html`);
            fs.writeFile(filePath, htmlContent, 'utf8', (err) => {
                if (err) {
                    console.error('Error al guardar el archivo:', err);
                    res.status(200).json('Error al guardar el archivo');
                } else {
                    console.log('Archivo HTML guardado exitosamente');
                    res.status(200).json('Archivo HTML guardado exitosamente');
                }
            });

            
        }
        else{
            res.status(200).json("invitacion no creada")
        }



    } catch (error) {
        res.status(500).json("error al crear una invitacion nueva", error)
    }

}
module.exports = postInvitacion
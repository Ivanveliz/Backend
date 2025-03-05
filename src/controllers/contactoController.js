const nodemailer = require('nodemailer');
const multer = require('multer');

// Configurar almacenamiento de archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




const renderContacto = (req, res) => {
  res.render('layouts/main', {
      body:'pages/contact',
        error: null
    } )
      
   
}
// Función para manejar el formulario y enviar correo
const submit = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const resume = req.file

        // Configurar Nodemailer
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: process.env.SMTP_SECURE === "true", // Convierte el string en booleano
          auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
          }
        });

        // Configurar el correo
        const mailOptions = {
            from: email,
            to: 'ivandveliz@gmail.com',
            subject: `Nuevo mensaje de ${name}`,
            text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
            attachments: []
        };

        // Si hay un archivo, adjuntarlo
        if (resume) {
            mailOptions.attachments.push({
                filename: resume.originalname,
                content: resume.buffer
            });
        }

        // Enviar el correo
        await transporter.sendMail(mailOptions);
        res.status(200).send('Mensaje enviado correctamente');
    } catch (error) {
        console.error('Error enviando el correo:', error);
        res.status(500).send('Hubo un error al enviar el correo');
    }
};

// Exportar funciones y configuración de Multer
module.exports = {
  renderContacto,
  submit,
    upload,
};

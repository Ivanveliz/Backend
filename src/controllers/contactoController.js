const nodemailer = require('nodemailer');
const multer = require('multer');
// Configurar almacenamiento de archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const renderContacto = (req, res) => {

    res.render("layouts/main", {
        body: "pages/contact",
        error: null
    });
};
// Función para manejar el formulario y enviar correo

const sendEmail = async (req, res) => {

    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: email,
            to: process.env.SMTP_USER,
            subject: `Nuevo mensaje de ${name}`,
            text: message,
            replyTo: email,
        });

        res.status(200).json({ success: true, message: "Correo enviado con éxito" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error enviando el correo", error });
    }
};


// Exportar funciones y configuración de Multer
module.exports = {
    renderContacto,
    sendEmail,
    upload

};

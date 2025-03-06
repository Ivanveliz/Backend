const { sendEmail } = require("../controllers/emailController");

module.exports = async function (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    const { name, email, message } = req.body;

    try {
        const response = await sendEmail(name, email, message);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Error enviando el correo", error });
    }
};

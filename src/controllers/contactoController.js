const nodemailer = require('nodemailer')

const index = (req, res) => {

    res.render('contacto')
}

const submit = async (req, res) =>{
    console.log(req.body)
    //esto es lo que hace que se conecte al mail 
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
        },
      });

      try {
        const info = await transporter.sendMail({
          from: `"${req.body.nombre}" <${req.body.email}>`, // sender address
          to: "bar@example.com, baz@example.com", // list of receivers
          subject: "Formulario de contacto. ✔", // Subject line
          text: req.body.mensaje, // plain text body
          html: `<pre>${req.body.mensaje}</pre>`, // html body el pre hace que el texto quede en formato como fue escrito (con los entener)
        })
        console.info(info)
      } catch (error) {
        console.error(error)
      }

    res.send('Enviando...')
  
}
module.exports = {
    index,
    submit,
  }
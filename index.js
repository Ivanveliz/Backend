//Varibale entorno:
require('dotenv').config()

//traer el path
const path = require('path')
const express = require('express')
const app = express()
const mainRouter = require('./src/routes/mainRoutes')
const methodOverRide = require('method-override')
const pool = require('./src/config/mysql.js')
const session = require('express-session');
const fs = require('fs')
const flash = require("connect-flash");


//Middleware:
//este middleware es para rebicir datos del formulario:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/js', express.static(path.join(__dirname, 'src/js')));

//modulo para el inicio de sesion

app.use(session({
    secret: process.env.SECRET_KEY || 'mi_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}));
app.use(flash());
//Configuracion EJS
app.set('view engine', 'ejs')
app.set('views', (path.join(__dirname, 'src/views')))

//para usar el layouts(componentizar)
// app.use(layout)
// app.set('layout', './layouts/layout')

app.use(mainRouter)
app.use(methodOverRide('_method'))
app.use('/', require('./src/routes/authRouter.js'))
app.use("/api/contacto", require("./src/routes/contactRouter.js"));



//este metodo se utiliza para simular un put en los formularios ya que solo aceptan post y get



//probando la base de datos:
app.get('/test-db', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.ping(); // Prueba si la BD responde
        connection.release();
        res.send('✅ Conectado a la base de datos');
    } catch (error) {
        res.status(500).send('❌ Error al conectar a la base de datos: ' + error.message);
    }
});

//Configuracion:
const PORT = process.env.PORT || 3001;
//Inicio del servidor:
app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`)
})
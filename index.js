//Varibale entorno:
require('dotenv').config()
//traer el path
const path = require('path')

const express = require('express')

const app = express()

//Configuracion:
const PORT = process.env.PORT || 3001; 

//Middleware:

app.use(express.static(path.join(__dirname, 'public')))
//motor de vista
app.set( 'view engine', 'ejs')
app.set('views', (path.join(__dirname, 'src/views')))

const mainRouter = require('./src/routes/mainRoutes')
app.use(mainRouter)

app.use('/productos',require('./src/routes/productosRoutes'))

//Inicio del servidor:
app.listen(PORT, () =>{
    console.log(`Esuchando en http://localhost:${PORT}`)
})
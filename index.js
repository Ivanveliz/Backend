//Varibale entorno:
require('dotenv').config()

const express = require('express')
const app = express()

//Configuracion:
const PORT = process.env.PORT || 3001; 

//Middleware:
const mainRouter = require('./src/routes/mainRoutes')
app.use(mainRouter)

app.use('/productos',require('./src/routes/productosRoutes'))

//Inicio del servidor:
app.listen(PORT, () =>{
    console.log(`Esuchando en http://localhost:${PORT}`)
})
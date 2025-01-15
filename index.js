//Varibale entorno:
require('dotenv').config()
//traer el path
const path = require('path')

const express = require('express')
const layout = require('express-ejs-layouts')
const app = express()

//Configuracion:
const PORT = process.env.PORT || 3001; 

//Middleware:
//este middleware es para rebicir datos del formulario:
// se configura con el extended false.
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
//motor de vista
app.set( 'view engine', 'ejs')
app.set('views', (path.join(__dirname, 'src/views')))

//para usar el layouts(componentizar)
app.use(layout)
app.set('layout', './layouts/layout')
const mainRouter = require('./src/routes/mainRoutes')
app.use(mainRouter)

app.use('/categorias', require('./src/routes/categoriasRouter'))
app.use('/productos',require('./src/routes/productosRoutes'))
app.use('/contacto', require('./src/routes/contactoRouter'))
//Inicio del servidor:
app.listen(PORT, () =>{
    console.log(`Esuchando en http://localhost:${PORT}`)
})
//Varibale entorno:
require('dotenv').config()
//traer el path
const path = require('path')
const express = require('express')
const layout = require('express-ejs-layouts')
const app = express()
const mainRouter = require('./src/routes/mainRoutes')
const methodOverRide = require('method-override')


//Configuracion:
const PORT = process.env.PORT || 3001;

//Middleware:
//este middleware es para rebicir datos del formulario:
// se configura con el extended false.
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/js', express.static(path.join(__dirname, 'src/js')));
//motor de vista
app.set('view engine', 'ejs')
app.set('views', (path.join(__dirname, 'src/views')))

//para usar el layouts(componentizar)
// app.use(layout)
// app.set('layout', './layouts/layout')

app.use(mainRouter)
//este metodo se utiliza para simular un put en los formularios ya que solo aceptan post y get
app.use(methodOverRide('_method'))

app.use('/categorias', require('./src/routes/categoriasRouter'))
app.use('/productos', require('./src/routes/productosRoutes'))
app.use('/contacto', require('./src/routes/contactoRouter'))
app.use('/', require('./src/routes/loginRouter.js'))
//Inicio del servidor:
app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`)
})
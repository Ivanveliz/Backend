const express = require('express')
const app = express()

//Configuracion:
const PORT = process.env.PORT || 3000; 

//Middleware:
app.use(express.static('public'))

//Rutas
app.get('/', (req, res)=> {
    res.send('hola mundo!')
})

//Inicio del servidor:
app.listen(PORT, () =>{
    console.log(`Esuchando en http://localhost:${PORT}`)
})
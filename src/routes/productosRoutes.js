const express = require('express')
const controller = require('../controllers/productosController')

const router = express.Router()

//ruta producto para sql
router.get('/create', controller.create)
router.post('/', controller.store)


//trae todos los productos
router.get('/', controller.index)

//trae 1 producto con params
router.get('/:id', controller.show)


// trae un limite de producto con QUERYS

module.exports = router
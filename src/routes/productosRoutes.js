const express = require('express')
const controller = require('../controllers/productosController')


const router = express.Router()

//trae todos los productos
router.get('/', controller.index)

//trae 1 producto con params
router.get('/:id', controller.show)


// trae un limite de producto con QUERYS

module.exports = router
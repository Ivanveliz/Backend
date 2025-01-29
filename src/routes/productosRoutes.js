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

//para editar:
//primero traigo el dato
router.get('/:id/edit', controller.edit)
//ahora hago el put, la edicion en si misma
router.put('/:id', controller.update)


//BORRAR producto
router.delete('/:id', controller.destroy)


module.exports = router
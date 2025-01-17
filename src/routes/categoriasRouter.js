const express = require('express')
const router = express.Router()

const controller = require('../controllers/categoriaController')
//CREATE
router.get('/create', controller.create)
router.post('/', controller.store)

//READ
router.get('/', controller.index)
router.get('/:id', controller.show)

//UPDATE
router.get('/:id/edit', controller.edit)
router.put('/:id', controller.update)

//DELETE
router.delete('/:id', controller.destroy)



module.exports = router
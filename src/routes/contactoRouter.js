const express = require('express')
const controller = require('../controllers/contactoController')
const router = express.Router()

router.get('/', controller.index)
router.post('/', controller.submit )

module.exports = router
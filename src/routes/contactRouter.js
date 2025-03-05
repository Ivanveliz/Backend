const express = require('express')
const controller = require ('../controllers/contactoController')
const router = express.Router();

router.get('/contacto', controller.renderContacto)
router.post('/contacto', controller.upload.single('resume'), controller.submit)


module.exports = router
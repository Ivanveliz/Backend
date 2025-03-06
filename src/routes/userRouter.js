const express = require('express');
const controller = require('../controllers/userController')
const router = express.Router()

router.get('/createUser', controller.renderCreateUser)
router.post('/createUser', controller.createUser)



module.exports = router;
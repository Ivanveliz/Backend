const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const controller = require('../controllers/authController');


const router = express.Router();

//renderizador de formulario
router.get('/login', controller.login);

//procesamiento del formulario
router.post('/login', controller.login);
router.post('/verify-email', controller.verifyEmail)
router.post('/complete-registration', controller.completeRegistration)


router.get('/dashboard', controller.dashboard);
router.get('/register', controller.register)

module.exports = router;
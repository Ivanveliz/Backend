const express = require('express');
const isAuthenticated = require('../middlewares/authMiddleware');
const controller = require('../controllers/authController');


const router = express.Router();

//renderizador de formulario
router.get('/login', controller.renderLogin);
router.get('/register', controller.register)

//procesamiento del formulario

router.post('/login', controller.login);
router.post('/verify-email', controller.verifyEmail)
router.post('/complete-registration', controller.completeRegistration)

router.get('/dashboard', isAuthenticated, controller.dashboard);




module.exports = router;
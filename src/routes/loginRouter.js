const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const controller = require('../controllers/authController');

const router = express.Router();

router.get('/login', controller.login);
router.get('/dashboard', controller.dashboard);
router.get('/register', controller.register)

module.exports = router;
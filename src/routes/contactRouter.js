const express = require('express')
const controller = require('../controllers/contactoController')
const router = express.Router();


router.get("/", controller.renderContacto);

router.post("/send-email", controller.upload.single("resume"), controller.sendEmail);


module.exports = router
const controller = require('../controllers/userController')

router.get('create', controller)
router.post('/createUser', controller.createUser)
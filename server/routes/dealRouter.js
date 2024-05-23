const Router = require('express')
const router = new Router()
const dealController = require('../controllers/dealController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), dealController.create)
router.post('/delete', checkRole('ADMIN'), dealController.delete)
router.get('/', dealController.getAll)
router.get('/:id', dealController.getOne)

module.exports = router
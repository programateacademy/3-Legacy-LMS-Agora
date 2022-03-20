const router = require('express').Router()
const auth = require('../middleware/auth')
const authTeacher = require('../middleware/authTeacher')
const controllerDelivery = require('../controllers/delivery')

router.post('/new-delivery', auth, controllerDelivery.create)
router.post('/new-delivery/:_id/text', auth, controllerDelivery.addChat)
router.get('/get-deliveries-cohort/:_id', authTeacher, controllerDelivery.getDeliveries)
router.get('/get-delivery/:_id', auth, controllerDelivery.getDelivery)
router.get('/get-delivery-student/:_id', auth, controllerDelivery.getDeliveryStudent)
router.get('/get-delivery-activity/:_id', authTeacher, controllerDelivery.getDeliveryProject)

module.exports = router
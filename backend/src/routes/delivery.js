const router = require('express').Router()
const authUser = require('../middleware/authUser')
const authTeacher = require('../middleware/authTeacher')
const controllerDelivery = require('../controllers/delivery')

router.post('/new-delivery', authUser,controllerDelivery.create)
router.post('/new-delivery/:_id/text', controllerDelivery.addChat)
router.get('/get-deliveries-cohort/:_id', controllerDelivery.getDeliveries)
router.get('/get-delivery/:activity/:_id', authUser, controllerDelivery.getDelivery)
router.get('/get-delivery-student/:_id', controllerDelivery.getDeliveryStudent)
router.get('/get-delivery-activity/:_id', controllerDelivery.getDeliveryProject)

module.exports = router
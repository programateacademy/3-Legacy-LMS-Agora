const router = require('express').Router()
const authUser = require('../middleware/authUser')
const authTeacher = require('../middleware/authTeacher')
const controllerDelivery = require('../controllers/delivery')

router.post('/new-delivery', authUser,controllerDelivery.create)
router.get('/get-deliveries-cohort/:_id', controllerDelivery.getDeliveries)
router.get('/get-delivery/:_user', authUser, controllerDelivery.getDelivery)
router.get('/get-delivery-activity/:_id', authTeacher ,controllerDelivery.getDeliveryProject)

module.exports = router
const router = require('express').Router()
const auth = require('../middleware/auth')

const controllerDelivery = require('../controllers/delivery')



router.post('/new-delivery', controllerDelivery.create)
router.post('/new-delivery/:_id/text', controllerDelivery.addChat)
router.post('/new-delivery/:_id/link',  controllerDelivery.addLink)
router.get('/get-deliveries/:_id', controllerDelivery.getDeliveries)
router.get('/get-delivery/:_id', controllerDelivery.getDelivery)
router.get('/get-delivery-student/:_id', controllerDelivery.getDeliveryStudent)
router.get('/get-delivery-project/:_id', controllerDelivery.getDeliveryProject)



//router.patch('/update-delivery', controllerDeliverie.updateDeliverie)



module.exports = router
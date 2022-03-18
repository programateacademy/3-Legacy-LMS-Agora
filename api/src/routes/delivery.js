const router = require('express').Router()
const auth = require('../middleware/auth')

const controllerDelivery = require('../controllers/delivery')



router.post('/new-delivery', auth, controllerDelivery.create)
router.post('/new-delivery/:id_delivery', auth, controllerDelivery.addChat)
router.post('/new-delivery/:id_delivery',auth,  controllerDelivery.addLink)
router.get('/get-deliveries',auth, controllerDelivery.getDeliveries)
router.get('/get-delivery/:id_delivery', controllerDelivery.getDelivery)
router.get('/get-delivery-student/:id_user',auth, controllerDelivery.getDeliveryStudent)
router.get('/get-delivery-project',auth, controllerDelivery.getDeliveryProject)



//router.patch('/update-delivery', controllerDeliverie.updateDeliverie)



module.exports = router
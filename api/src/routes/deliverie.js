const router = require('express').Router()
const auth = require('../middleware/auth')

const controllerDeliverie = require('../controllers/deliverie')



router.post('/new-deliverie', auth, controllerDeliverie.create)
router.post('/new-deliverie/:id_deliverie', auth, controllerDeliverie.addChat)
router.post('/new-deliverie/:id_deliverie',auth,  controllerDeliverie.addLink)
router.get('/get-deliveries',auth, controllerDeliverie.getDeliveries)
router.get('/get-deliverie/:id_deliverie', controllerDeliverie.getDeliverie)
router.get('/get-deliverie-student/:id_user',auth, controllerDeliverie.getDeliverieStudent)
router.get('/get-deliverie-proyect',auth, controllerDeliverie.getDeliverieProyect)



//router.patch('/update-deliverie', controllerDeliverie.updateDeliverie)



module.exports = router
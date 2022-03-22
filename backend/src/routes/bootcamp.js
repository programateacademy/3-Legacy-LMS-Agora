const router = require('express').Router()
const authAdmin = require('../middleware/authAdmin')
const controllerBootcamp = require('../controllers/bootcamp')

router.post('/new-bootcamp', controllerBootcamp.create);
router.get('/get-bootcamps', controllerBootcamp.getBootcamps);
router.get('/get-bootcamps/:_id', controllerBootcamp.getBootcamp);
router.put('/update-bootcamp/:_id', controllerBootcamp.updateBootcamp)
router.delete('/delete-bootcamp/:_id', controllerBootcamp.deleteBootcamp);

module.exports = router
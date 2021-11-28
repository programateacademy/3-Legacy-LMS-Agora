const router = require('express').Router()
const auth = require('../middleware/auth')
const controllerAnnuncie = require('../controllers/annuncie')



router.post('/new-announcie', controllerAnnuncie.create)
router.get('/get-announcies', controllerAnnuncie.getAnnuncies)
router.patch('/update-announcie',auth,controllerAnnuncie.updateAnnuncie)



module.exports = router

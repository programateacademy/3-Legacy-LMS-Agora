const router = require('express').Router()
const auth = require('../middleware/auth')
const controllerAnnuncie = require('../controllers/annuncie')

router.post('/new-announcie', controllerAnnuncie.create);
router.get('/get-announcies', controllerAnnuncie.getAnnuncies);
router.put('/update-announcie/:_id',controllerAnnuncie.updateAnnuncie)
router.delete('/delete-announcie/:_id', controllerAnnuncie.deleteAnnuncie);

module.exports = router

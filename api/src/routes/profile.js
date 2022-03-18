const router = require('express').Router()
const controllerProfile = require('../controllers/profile')

router.post('/new-profile', controllerProfile.create);
router.get('/get-profiles', controllerProfile.getProfiles);
router.get('/get-profile/:_id', controllerProfile.getProfile);
router.put('/update-profile/:_id',controllerProfile.updateProfile)
router.delete('/delete-profile/:_id', controllerProfile.deleteProfile);

module.exports = router

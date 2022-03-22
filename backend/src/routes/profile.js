const router = require('express').Router()
const auth = require('../middleware/auth')
const authTeacher = require('../middleware/authTeacher')
const authAdmin = require('../middleware/authAdmin')
const controllerProfile = require('../controllers/profile')

router.post('/new-profile', controllerProfile.create);
router.get('/get-profiles/:_id', controllerProfile.getProfiles);
router.get('/get-profile/:_id', controllerProfile.getProfile);
router.put('/update-profile/:_id', controllerProfile.updateProfile)
router.put('/update-profile-competence/:_id', controllerProfile.updateCompetence)
router.delete('/delete-profile/:_id', controllerProfile.deleteProfile);

module.exports = router

const router = require('express').Router()
const auth = require('../middleware/auth')
const authTeacher = require('../middleware/authTeacher')
const authAdmin = require('../middleware/authAdmin')
const controllerProfile = require('../controllers/profile')

router.post('/new-profile', auth, controllerProfile.create);
router.get('/get-profiles/:_id', authTeacher, controllerProfile.getProfiles);
router.get('/get-profile/:_id', auth, controllerProfile.getProfile);
router.put('/update-profile/:_id', auth, controllerProfile.updateProfile)
router.put('/update-profile-competence/:_id', authTeacher, controllerProfile.updateCompetence)
router.delete('/delete-profile/:_id', authAdmin, controllerProfile.deleteProfile);

module.exports = router

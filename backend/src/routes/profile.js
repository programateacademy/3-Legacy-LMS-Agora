const router = require('express').Router()
const authUser = require('../middleware/authUser')
const authTeacher = require('../middleware/authTeacher')
const controllerProfile = require('../controllers/profile')

router.get('/get-profiles/:_id', authTeacher, controllerProfile.getProfiles);
router.get('/get-profile/:_id', authUser , controllerProfile.getProfile);
router.put('/update-profile/:_id', authUser , controllerProfile.updateProfile)
router.put('/update-profile-competence/:_id',authTeacher , controllerProfile.updateCompetence)

module.exports = router

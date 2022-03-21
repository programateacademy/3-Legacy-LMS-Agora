const router = require('express').Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const controllerCohort = require('../controllers/cohort')

router.post('/new-cohort', authAdmin, controllerCohort.create);
router.get('/get-cohorts/:_id', auth, controllerCohort.getCohorts);
router.get('/get-cohort/:_id', authAdmin, controllerCohort.getCohort);
router.put('/update-cohort/:_id', authAdmin, controllerCohort.updateCohort)
router.delete('/delete-cohort/:_id', authAdmin, controllerCohort.deleteCohort);

module.exports = router
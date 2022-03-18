const router = require('express').Router()
const controllerCohort = require('../controllers/cohort')

router.post('/new-cohort', controllerCohort.create);
router.get('/get-cohort', controllerCohort.getCohorts);
router.get('/get-cohort/:_id', controllerCohort.getCohort);
router.put('/update-cohort/:_id',controllerCohort.updateCohort)
router.delete('/delete-cohort/:_id', controllerCohort.deleteCohort);

module.exports = router
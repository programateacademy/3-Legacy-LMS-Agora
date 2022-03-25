const router = require('express').Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const controllerCompetence = require('../controllers/competences')

router.post('/new-competence', authAdmin, controllerCompetence.create);
router.get('/get-competences/:_id', controllerCompetence.getCompetences);
router.get('/get-competence/:_id', controllerCompetence.getCompetence);
router.put('/update-competence/:_id', controllerCompetence.updateCompetence)
router.delete('/delete-competence/:_id', controllerCompetence.deleteCompetence);

module.exports = router
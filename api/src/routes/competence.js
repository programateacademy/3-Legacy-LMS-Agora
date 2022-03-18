const router = require('express').Router()
const controllerCompetence = require('../controllers/competences')

router.post('/new-competence', controllerCompetence.create);
router.get('/get-competences', controllerCompetence.getCompetences);
router.get('/get-competence/:_id', controllerCompetence.getCompetence);
router.put('/update-competence/:_id',controllerCompetence.updateCompetence)
router.delete('/delete-competence/:_id', controllerCompetence.deleteCompetence);

module.exports = router
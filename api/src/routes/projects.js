const router = require('express').Router()
const auth = require('../middleware/auth')
const controllerProject = require('../controllers/projects')



router.post('/new-project', controllerProject.create)
router.get('/get-projects', controllerProject.getProjects)
router.get('/get-one-project/:id', controllerProject.getOneProject)



module.exports = router

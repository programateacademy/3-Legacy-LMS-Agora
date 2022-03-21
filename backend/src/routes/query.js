const router = require('express').Router()
const auth = require('../middleware/auth')
const authTeacher = require('../middleware/authTeacher')
const controllerQuery = require('../controllers/query')

router.post('/new-query', authTeacher, controllerQuery.create);
router.get('/get-queries/:_id', auth, controllerQuery.getQueries);
router.get('/get-queries/:_id', auth, controllerQuery.getQuery);
router.put('/update-query/:_id', authTeacher, controllerQuery.updateQuery)
router.delete('/delete-query/:_id', authTeacher, controllerQuery.deleteQuery);

module.exports = router
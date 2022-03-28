const router = require('express').Router()
const auth = require('../middleware/auth')
const authTeacher = require('../middleware/authTeacher')
const controllerQuery = require('../controllers/query')

router.post('/new-query', authTeacher, controllerQuery.create);
router.get('/get-queries/:_id', controllerQuery.getQueries);
router.get('/get-queries/:_id', controllerQuery.getQuery);
router.put('/update-query/:_id', controllerQuery.updateQuery)
router.delete('/delete-query/:_id', controllerQuery.deleteQuery);

module.exports = router
const router = require('express').Router()
const auth = require('../middleware/auth')
const controllerQuery = require('../controllers/query')

router.post('/new-query', controllerQuery.create);
router.get('/get-queries', controllerQuery.getQueries);
router.get('/get-queries/:_id', controllerQuery.getQuery);
router.put('/update-query/:_id',controllerQuery.updateQuery)
router.delete('/delete-query/:_id', controllerQuery.deleteQuery);

module.exports = router
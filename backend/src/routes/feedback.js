const router = require('express').Router()
const controllerFeedback = require('../controllers/feedback')
const authTeacher = require('../middleware/authTeacher')

router.post('/new-outcome', controllerFeedback.create)
router.get('/get-outcome/:id_delivery', controllerFeedback.getOutcome)
router.post('/new-outcome/:_id/text', controllerFeedback.addChat)

module.exports = router
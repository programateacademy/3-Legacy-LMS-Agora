const router = require('express').Router()
const controllerFeedback = require('../controllers/feedback')
const authTeacher = require('../middleware/authTeacher')

router.post('/new-outcome', authTeacher, controllerFeedback.create)
router.get('/get-outcome/:id_delivery', authTeacher, controllerFeedback.getOutcome)
router.post('/new-outcome/:_id/text', authTeacher, controllerFeedback.addChat)

module.exports = router
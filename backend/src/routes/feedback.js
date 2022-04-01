const router = require('express').Router()
const controllerFeedback = require('../controllers/feedback')
const authTeacher = require('../middleware/authTeacher')
const authUser = require('../middleware/authUser')

router.post('/new-outcome', authTeacher, controllerFeedback.create)
router.get('/get-outcome/:_user',authUser ,controllerFeedback.getOutcome)


module.exports = router
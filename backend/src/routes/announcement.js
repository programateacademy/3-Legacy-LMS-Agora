const router = require('express').Router()
const auth = require('../middleware/auth')
const authTeacher = require('../middleware/authTeacher')
const controllerAnnouncement = require('../controllers/announcement')

router.post('/new-announcement', controllerAnnouncement.create);
router.get('/get-announcements/:_id', controllerAnnouncement.getAnnouncements);
router.get('/get-announcement/:_id', controllerAnnouncement.getAnnouncement);
router.put('/update-announcement/:_id', controllerAnnouncement.updateAnnouncement);
router.delete('/delete-announcement/:_id', controllerAnnouncement.deleteAnnouncement);

module.exports = router

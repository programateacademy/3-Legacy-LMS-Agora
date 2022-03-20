const router = require('express').Router()
const authTeacher = require('../middleware/authTeacher')
const controllerAnnouncement = require('../controllers/announcement')

router.post('/new-announcement', authTeacher, controllerAnnouncement.create);
router.get('/get-announcements/:_id', authTeacher, controllerAnnouncement.getAnnouncements);
router.get('/get-announcement/:_id', authTeacher, controllerAnnouncement.getAnnouncement);
router.put('/update-announcement/:_id', authTeacher, controllerAnnouncement.updateAnnouncement);
router.delete('/delete-announcement/:_id', authTeacher, controllerAnnouncement.deleteAnnouncement);

module.exports = router

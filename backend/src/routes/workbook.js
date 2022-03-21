const router = require('express').Router()
const authTeacher = require('../middleware/authTeacher')
const auth = require("../middleware/auth");
const controllerWorkbook = require('../controllers/workbook')

router.post('/new-workbook', authTeacher, controllerWorkbook.create);
router.get('/get-workbooks/:_id', auth, controllerWorkbook.getWorkbooks);
router.get('/get-workbooks/:_id', auth, controllerWorkbook.getWorkbook);
router.put('/update-workbook/:_id', authTeacher, controllerWorkbook.updateWorkbook)
router.delete('/delete-workbook/:_id', authTeacher, controllerWorkbook.deleteWorkbook);

module.exports = router
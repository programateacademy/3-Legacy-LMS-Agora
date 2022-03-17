const router = require('express').Router()
const auth = require('../middleware/auth')
const controllerWorkbook = require('../controllers/workbook')

router.post('/new-workbook', controllerWorkbook.create);
router.get('/get-workbooks', controllerWorkbook.getWorkbooks);
router.get('/get-workbooks/:_id', controllerWorkbook.getWorkbook);
router.put('/update-workbook/:_id',controllerWorkbook.updateWorkbook)
router.delete('/delete-workbook/:_id', controllerWorkbook.deleteWorkbook);

module.exports = router
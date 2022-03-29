const router = require("express").Router();
const authTeacher = require("../middleware/authTeacher");
const auth = require("../middleware/auth");
const controllerWorkbook = require("../controllers/workbook");

router.post("/new-workbook", authTeacher, controllerWorkbook.create);
router.get("/get-workbooks/:_id", controllerWorkbook.getWorkbooks);
router.get("/get-workbooks/:_id", controllerWorkbook.getWorkbook);
router.put("/update-workbook/:_id", controllerWorkbook.updateWorkbook);
router.delete("/delete-workbook/:_id", controllerWorkbook.deleteWorkbook);

module.exports = router;

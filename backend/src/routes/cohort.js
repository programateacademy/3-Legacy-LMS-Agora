const router = require("express").Router();
const authUser = require("../middleware/authUser");
const authAdmin = require("../middleware/authAdmin");
const controllerCohort = require("../controllers/cohort");

router.post("/new-cohort", authAdmin, controllerCohort.create);
router.get("/get-cohorts/:_id", authAdmin, controllerCohort.getCohorts);
router.get("/get-cohort/:_id", authUser, controllerCohort.getCohort);
router.get("/get-cohorts-teacher/:_id", authUser, controllerCohort.getCohortsTeacher);
router.put("/update-cohort/:_id", authAdmin, controllerCohort.updateCohort);
router.delete("/delete-cohort/:_id", controllerCohort.deleteCohort);

module.exports = router;

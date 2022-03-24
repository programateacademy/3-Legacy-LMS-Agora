const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const controllerCohort = require("../controllers/cohort");

router.post("/new-cohort", controllerCohort.create);
router.get("/get-cohorts/:_id", authAdmin, controllerCohort.getCohorts);
router.get("/get-cohort/:_id", controllerCohort.getCohort);
router.put("/update-cohort/:_id", controllerCohort.updateCohort);
router.delete("/delete-cohort/:_id", controllerCohort.deleteCohort);

module.exports = router;

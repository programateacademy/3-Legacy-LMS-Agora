const router = require("express").Router();
const authUser = require("../middleware/authUser");
const authTeacher = require("../middleware/authTeacher");
const controllerProject = require("../controllers/projects");

router.post("/new-project", authTeacher, controllerProject.create);
router.get("/get-project/:_id", authUser, controllerProject.getProject);
router.get("/get-projects/:_id", authUser, controllerProject.getProjects);
router.put("/update-project/:_id", authTeacher, controllerProject.updateProject);
router.delete("/delete-project/:_id", authTeacher, controllerProject.deleteProject);

module.exports = router;

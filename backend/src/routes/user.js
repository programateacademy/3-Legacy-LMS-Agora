const router = require("express").Router();
const controllerUser = require("../controllers/user");
const authSuperAdmin = require("../middleware/authSuperAdmin");
const auth = require('../middleware/auth')
const authAdmin = require("../middleware/authAdmin");
const authTeacher = require("../middleware/authTeacher");

router.post("/activation", controllerUser.activateEmail);
router.get("/activation/:activation_token", controllerUser.activateEmail);
router.post("/login", controllerUser.login);
router.post("/refresh_token", controllerUser.getAccessToken);
router.post("/forgot", controllerUser.forgotPassword);

router.post("/reset", auth, controllerUser.resetPassword);
router.get("/info", auth, controllerUser.getUserInfo);

router.post("/register", auth, controllerUser.register);
router.get("/all_admin", authSuperAdmin, controllerUser.getAdminAllInfo);

router.get("/all_students/:_id", auth, controllerUser.getUsersAllStudents);
router.delete("/delete/:id", authAdmin, controllerUser.deleteUser);

module.exports = router;

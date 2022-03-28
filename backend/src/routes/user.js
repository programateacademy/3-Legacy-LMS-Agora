const router = require("express").Router();
const controllerUser = require("../controllers/user");
const authSuperAdmin = require("../middleware/authSuperAdmin");
const auth = require('../middleware/auth')
const authAdmin = require("../middleware/authAdmin");
const authTeacher = require("../middleware/authTeacher");
const authUser = require('../middleware/authUser');

router.post("/activation", controllerUser.activateEmail);
router.get("/activation/:activation_token", controllerUser.activateEmail);
router.post("/login", controllerUser.login);
router.post("/refresh_token", controllerUser.getAccessToken);
router.post("/forgot", controllerUser.forgotPassword);

router.post("/reset", controllerUser.resetPassword);
router.get("/info", auth, controllerUser.getUserInfo);

router.get("/all_admin", authSuperAdmin, controllerUser.getAdminAllInfo);
router.post("/register_admin", authSuperAdmin, controllerUser.register);
router.get("/get_admin/:_id", authSuperAdmin, controllerUser.getAdminInfo);
router.get("/get_user/:_id", authAdmin, controllerUser.getAdminInfo);
router.put("/update_admin/:_id", authSuperAdmin, controllerUser.updateUser);
router.put("/update_user/:_id",authAdmin ,controllerUser.updateUser);
router.delete("/delete_admin/:_id", authSuperAdmin, controllerUser.deleteUser);
router.get("/all_teacher", authAdmin, controllerUser.getTeacherAllInfo);

router.get("/all_students/:_id", authAdmin, controllerUser.getUsersAllStudents);
router.delete("/delete_user/:_id", authAdmin, controllerUser.deleteUser);
router.post("/register_teacher",authAdmin, controllerUser.register);
router.post("/register_student", authAdmin, controllerUser.register);

module.exports = router;

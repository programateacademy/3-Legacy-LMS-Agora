const router = require('express').Router()
const controllerUser = require('../controllers/user')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const authTeacher = require('../middleware/authTeacher')

router.post('/register', controllerUser.register)

router.post('/register_admin', auth, authAdmin, controllerUser.registerAdmin)

router.post('/activation', controllerUser.activateEmail)

router.post('/login', controllerUser.login)

router.post('/refresh_token', controllerUser.getAccessToken)

router.post('/forgot', controllerUser.forgotPassword)

router.post('/reset', auth, controllerUser.resetPassword)

router.get('/info', auth, controllerUser.getUserInfor)

router.get('/all_info', auth, authAdmin, controllerUser.getUsersAllInfor) 

router.get('/all_students', auth, authTeacher, controllerUser.getUsersAllStudents) //auth, authTeacher

router.patch('/update', auth, controllerUser.updateUser)

router.patch('/update_role/:id', auth, authAdmin, controllerUser.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, controllerUser.deleteUser)

router.get('/badge', controllerUser.getBadges)

router.patch('/update_badge/:id',controllerUser.updateBadge)
 

module.exports = router

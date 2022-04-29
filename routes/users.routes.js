const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authUserController')
const { getSingleUser, getAllUsers, deleteUser, dashboardStat, updateUser } = require('../controllers/UserController')
const { verifyAdmin } = require('../middleware/verifyAdmin')
const verifyToken = require('../middleware/verifyToken')

router.post('/register', register)
router.post('/login', login)

router.use(verifyToken)

router.get('/all-users', verifyAdmin(false), getAllUsers)
router.get('/stat', verifyAdmin(false), dashboardStat)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', verifyAdmin(false), deleteUser)
router.get('/single-user/:id', verifyAdmin(false), getSingleUser)

module.exports = router
const router = require('express').Router()

const { register, login} = require('../controllers/authUserController')
const { getAllUsers, getSingleUser } = require('../controllers/userController')
const { roles } = require('../middlewares/verifyAdmin')
const verifyToken = require('../middlewares/verifyToken')

router.post('/login', login)
router.post('/register', register)

router.use(verifyToken)

router.get('/all-users', roles(false), getAllUsers)

router.get('/single-user/:id', getSingleUser)

module.exports = router 
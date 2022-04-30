const { register } = require('../controllers/authUserController')

const router = require('express').Router()

router.get('/login', (req, res) => {
    res.status(200).json({ message : "This is the login page"})
})
router.post('/register', register)

module.exports = router 
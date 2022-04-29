const express = require('express')
const router = express.Router()
const { newCart, updateCart, deleteCart, getAllCarts, getUserCart } = require('../controllers/cartController')
const { verifyAdmin } = require('../middleware/verifyAdmin')
const verifyToken = require('../middleware/verifyToken')


router.use(verifyToken)

router.get('/', verifyAdmin(false), getAllCarts)
router.post('/new-cart', newCart)
router.put('/update/:id', updateCart)
router.delete('/delete/:id', deleteCart)
router.get('/user-cart/:userId', getUserCart)

module.exports = router
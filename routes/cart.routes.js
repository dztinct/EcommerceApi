const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const { verifyAdmin } = require('../middlewares/verifyAdmin')
const { createCart, getAllCarts, getUserCart, deleteCart, updateCart } = require('../controllers/cartController')

router.use(verifyToken)
 
router.get('/all', verifyAdmin(false), getAllCarts)


router.get('/single/:userId', getUserCart)

router.post('/create', createCart)
router.delete('/delete/:id', deleteCart)
router.put('/update/:id', updateCart)

module.exports = router
const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const { verifyAdmin } = require('../middlewares/verifyAdmin')
const { getAllOrders, getUserOrder, createOrder, deleteOrder, updateOrder } = require('../controllers/orderController')

router.use(verifyToken)
 
router.get('/all', verifyAdmin(false), getAllOrders)


router.get('/single/:userId', getUserOrder)

router.post('/create', createOrder)
router.delete('/delete/:id', deleteOrder)
router.put('/update/:id', updateOrder)

module.exports = router
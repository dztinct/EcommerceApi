const express = require('express')
const router = express.Router()
const { newOrder, updateOrder, deleteOrder, getUserOrders, salesStat, getAllOrders } = require('../controllers/orderController')
const { verifyAdmin } = require('../middleware/verifyAdmin')
const verifyToken = require('../middleware/verifyToken')

router.use(verifyToken)

router.get('/', verifyAdmin(false), getAllOrders)
router.post('/new-order', newOrder)
router.put('/update', verifyAdmin(false), updateOrder)
router.delete('/delete', verifyAdmin(false), deleteOrder)
router.get('/single-order/:userId', getUserOrders)
router.get('/sales', verifyAdmin(false), salesStat)

module.exports = router
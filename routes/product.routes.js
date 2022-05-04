const router = require('express').Router()
const { createProduct, getAllProducts, getSingleProduct, deleteProduct } = require('../controllers/productController')
const verifyToken = require('../middlewares/verifyToken')
const { verifyAdmin } = require('../middlewares/verifyAdmin')

router.get('/all', getAllProducts)
router.get('/single/:id', getSingleProduct)

router.use(verifyToken)

router.post('/create', verifyAdmin(false), createProduct)
router.delete('/delete/:id', verifyAdmin(false), deleteProduct)

module.exports = router
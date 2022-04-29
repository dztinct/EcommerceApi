const express = require('express')
const router = express.Router()
const { updateProduct, newProduct, deleteProduct, getSingleProduct, getAllProducts } = require('../controllers/productController')
const {verifyAdmin} = require('../middleware/verifyAdmin')
const verifyToken = require('../middleware/verifyToken')

router.get('/', getAllProducts)

router.use(verifyToken)

router.delete('/delete', verifyAdmin(false), deleteProduct)
router.post('/new-product', verifyAdmin(false), newProduct)
router.put('/update/:id', updateProduct)
router.get('/single-product/:id', getSingleProduct)

module.exports = router


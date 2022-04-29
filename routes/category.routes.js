const express = require('express')
const router = express.Router()
const { getAllCategories, newCategory, updateCategory, deleteCategory, getCategory } = require('../controllers/categoryController')
const { verifyAdmin } = require('../middleware/verifyAdmin')
const verifyToken = require('../middleware/verifyToken')

router.get('/', getAllCategories)
router.get('/single-category/:id', getCategory)

router.use(verifyToken)
router.use(verifyAdmin(false))

router.post('/new-category', newCategory)
router.put('/update/:id', updateCategory)
router.delete('/delete/:id', deleteCategory)

module.exports = router
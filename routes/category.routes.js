const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const { verifyAdmin } = require('../middlewares/verifyAdmin')
const { createCategory, getAllCategory, getSingleCategory, deleteCategory, updateCategory } = require('../controllers/categoryController')

router.get('/all', getAllCategory)
router.get('/single/:id', getSingleCategory)

router.use(verifyToken)

router.post('/create', verifyAdmin(false), createCategory)
router.delete('/delete/:id', verifyAdmin(false), deleteCategory)
router.put('/update/:id', verifyAdmin(false), updateCategory)

module.exports = router
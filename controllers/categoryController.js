const Category = require('../model/Category')

//CREATE CATEGORY
exports.createCategory = async (req, res, next) => {
    try {
        const data = new Category({
            title : req.body.title,
        })
        const createCategory = await data.save()
        return res.status('201').json({data : createCategory})

    } catch (error) {
        return next(new Error(error))
    }
}

//GET ALL CATEGORY
exports.getAllCategory = async (req, res, next) => {
    try {
        const allCategory = await Category.find()
        return res.status('201').json({data : allCategory})
    } catch (error) {
        return next(res.status(401).json({message : error}))
    }
}

//GET SINGLE Category
exports.getSingleCategory = async (req, res, next) => {
    try {
        const singleCategory = await Category.findById(req.params.id)
        return res.status('201').json({data : singleCategory})    
    } catch (error) {
        return next(res.status('401').json({message : error}))
    }
}

//UPDATE Category
exports.updateCategory = async (req, res, next) => {
    try {
        updateData = {
            title : req.body.title,
        }
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updateData, {new : true})
        res.status(200).json({data : updatedCategory})
    } catch (error) {
        console.log(error)
        return next(res.status(500).json(error))
    }
}

//DELETE Category
exports.deleteCategory = async (req, res, next) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({message : 'Data has been deleted!'})
    } catch (error) {
        console.log(error)
        return next(res.status('401').json({message : error}))

    }
}
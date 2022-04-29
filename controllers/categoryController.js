const Category = require('../models/Category')

const newCategory = async (req, res) => {
    try{

        const category = await new Category({
            title : req.status.title
        })
        savedCategory = await category.save()
        if(savedCategory){
            res.status(201).json({data : category})
            
        }
    }catch(error){
        res.status(201).json({message : error})
    }
    
}

const getCategory = async (req, res) => {
    try{
    const category = await Category.findOne({id : req.params.id})
    res.status(200).json({data : category})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

const getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find()
        res.status(200).json({data : categories})
        } catch (error) {
            res.status(401).json({message : 'Unable access all carts'})
        }
    }

const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{new : true})
            res.status(200).json({data : updatedCategory})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)          
    }
}


const deleteCategory = async (req, res) => {
    try {
        const rmCart= await Category.findByIdAndDelete(req.params.id)
        rmCart && res.status(200).json({message : 'delete success'})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

module.exports = {
    newCategory,
    getAllCategories, 
    getCategory,
    deleteCategory,
    updateCategory
}
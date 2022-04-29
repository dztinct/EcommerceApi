const upload = require('../config/upload')
const Product = require('../models/Product')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
require('dotenv').config()

// cloudinary connect
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

const newProduct = async (req, res, next) => {
    const ImageFile = upload.single('img')
    ImageFile(req, res, async (err) => {
        try{
            const { file } = req
            const cloudFile = await cloudinary.uploader.upload(file.path)
            fs.unlinkSync(`uploads/products/${file.filename}`)
            
            if(err){
            res.status(401).json({err})
        }

            const product = {
                img : cloudFile.url,
                // img : `uploads/products/${file.filename}`,
                title : req.body.title,
                desc : req.body.desc,
                categories : req.body.categories,
                size : req.body.size,
                color : req.body.color,
                price : req.body.price
            }

            const savedProduct = await Product.create(product)

            res.status(201).json({data : savedProduct})
            

        
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
})
}

const getSingleProduct = async (req, res) => {
    try{
    const singleProduct = await Product.findOne({id : req.params.id})
    res.status(200).json({data : singleProduct})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

const getAllProducts = async (req, res) => {
    try{
        const qNew = req.query.new
        const qCategory = req.query.category    
        
        let products
        
        if(qNew){
            products = await Product.find().sort({createdAt : - 1}).limit(1)
        }else if(qCategory){
            products = await Product.find({categories : { $in : [qCategory]}})
        }
        res.status(200).json({data : products})
        } catch (error) {
            res.status(401).json({message : 'Unable access all products'})
        }
    }

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{new : true})
            res.status(200).json({data : updatedProduct})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)          
    }
}


const deleteProduct = async (req, res) => {
    try {
        const rmProduct = await Product.findByIdAndDelete(req.params.id)
        rmProduct && res.status(200).json({message : 'delete success'})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

module.exports = {
    newProduct,
    deleteProduct,
    getSingleProduct,
    getAllProducts,
    updateProduct
}
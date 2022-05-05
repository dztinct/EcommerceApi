const Product = require('../model/Product')
const upload = require('../config/upload')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
require('dotenv').config()


//CLOUDINARY CONNECT
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

//CREATE PRODUCT
exports.createProduct = async (req, res, next) => {
    const ImageFile = upload.single('image')
    ImageFile(req, res, async(err) => {
        try {
            const { file } = req
            const cloudFile = await cloudinary.uploader.upload(file.path)
            fs.unlinkSync(`uploads/products/${file.filename}`)
            if(err){
                throw err
            }
            const data = {
                image : cloudFile.url,
                description : req.body.description,
                name : req.body.name,
                price : req.body.price,
                category : req.body.category,
            }
            const savedProduct = await Product.create(data)
            return res.status('201').json({data : savedProduct})
        } catch (error) {
            console.log(error)
            return next(res.status(403).json(error))
        }
    })
}

//GET ALL PRODUCTS
exports.getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await Product.find().sort({_id : -1}).populate({path : 'category', select : 'title-_id'})
        return res.status('201').json({data : allProducts})
    } catch (error) {
        return next(res.status(401).json({message : error}))
    }
}

//GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res, next) => {
    try {
        const singleProduct = await Product.findById(req.params.id).sort({_id : -1}).populate({path : 'category', select : 'title-_id'})
        return res.status('201').json({data : singleProduct})    
    } catch (error) {
        return next(res.status('401').json({message : error}))
    }
}

//UPDATE PRODUCT
exports.updateProduct = async (req, res, next) => {
    const ImageFile = upload.single('image')
    ImageFile(req, res, async(err) => {
        try {
            const { file } = req
            if(err){
                throw err
            }
            updateData = {
                image : `uploads/products/${file.filename}`,
                description : req.body.description,
                name : req.body.name,
                price : req.body.price,
                category : req.body.category,
            }
       const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {new : true})
            res.status(200).json({data : updatedProduct})
        } catch (error) {
            console.log(error)
            return next(res.status(500).json(error))
        }
    })
}

//DELETE PRODUCT
exports.deleteProduct = async (req, res, next) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message : 'Data has been deleted!'})
    } catch (error) {
        console.log(error)
        return next(res.status('401').json({message : error}))

    }
}
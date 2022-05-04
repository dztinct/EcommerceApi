const Product = require('../model/Product')
const upload = require('../config/upload')

exports.createProduct = async (req, res, next) => {
    const ImageFile = upload.single('image')
    ImageFile(req, res, async(err) => {
        try {
            const { file } = req
            if(err){
                throw err
            }
            const data = {
                image : `uploads/products/${file.filename}`,
                description : req.body.description,
                name : req.body.name,
                price : req.body.price,
                category : req.body.category,
            }
            const savedProduct = await Product.create(data)
            res.status('201').json({data : savedProduct})
        } catch (error) {
            console.log(error)
            return next(res.status(403).json(error))
        }
    })
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await Product.find()
        return res.status('201').json({data : allProducts})
    } catch (error) {
        return next(res.status(401).json({message : error}))
    }
}

exports.getSingleProduct = async (req, res, next) => {
    try {
        const singleProduct = await Product.findById(req.params.id)
        return res.status('201').json({data : singleProduct})    
    } catch (error) {
        return next(res.status('401').json({message : error}))
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message : 'Data has been deleted!'})
    } catch (error) {
        console.log(error)
        return next(res.status('401').json({message : error}))

    }
}
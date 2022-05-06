const Cart = require('../model/Cart')

//CREATE NEW CART
exports.createCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body
        const cart  = new Cart({
            userId : req.body.userId,
            productId : req.body.productId,
        })
        const savedCart = await cart.save()
        return res.status(201).json({data : savedCart})
    } catch (error) {
        console.log(error)
       return next(res.status(401).json({message : error}))
    }
}

//GET USER CART
exports.getUserCart = async (req, res, next) => {
    try{
    const userCart = await Cart.findById(req.params.userId).sort({_id : -1}).populate({path:'products', select : 'productId-_id'})
    return res.status(200).json({data : userCart})
    } catch (error) {
        console.log(error)
        return res.status(401).json({message : error})
    }
}

//GET ALL CARTS
exports.getAllCarts = async (req, res, next) => {
    try{
        const carts = await Cart.find().sort({_id : -1}).populate({path : 'product', select : 'productId-_id'})
        res.status(200).json({data : carts})
        } catch (error) {
            console.log(error)
            return next(res.status(401).json({message : 'Unable access all carts'}))
        }
    }

    //UPDATE USER CART
exports.updateCart = async (req, res, next) => {
    try {
        const updateData = {
            userId : req.body.userId,
            product : req.body.product
        }
        const updatedCart = await Cart.findByIdAndUpdate(req.params.userId, updateData, {new : true})
            return res.status(200).json({data : updatedCart})
    } catch (error) {
        console.log(error)
        return next((res.status(500).json(error)))
    }
}

// DELETE USER CART
exports.deleteCart = async (req, res, next) => {
    try {
        const rmCart = await Cart.findByIdAndDelete(req.params.userId)
       return res.status(200).json({message : 'delete success'})
    } catch (error) {
        console.log(error)
        return next(res.status(401).json({message : error}))
    }
}

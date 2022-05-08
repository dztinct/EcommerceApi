const Cart = require('../model/Cart')

//CREATE NEW CART
exports.createCart = async (req, res, next) => {
    try {
        const cart  = new Cart({
            userId : req.body.userId,
            productId : req.body.productId,
            quantity : req.body.quantity
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
    const userCart = await Cart.find({userId : req.params.userId}, {productId : 1, quantity : 1, _id : 0}).sort({_id : -1}).populate({path:'productId', select : 'name-_id'})

    if(userCart){
        return res.status(200).json({data : userCart})
    }else{
        console.log(req.params.userId)
        return next(res.status(401).json({message : 'cannot fetch data'}))
    } 
    } catch (error) {
        console.log(error)
        return next(res.status(401).json({message : error}))
    }
}

//GET ALL CARTS
exports.getAllCarts = async (req, res, next) => {
    try{
        const carts = await Cart.find().sort({_id : -1}).populate({path : 'productId', select : 'name-_id'})

        res.status(200).json({data : carts})
        } catch (error) {
            console.log(error)
            console.log(error)
            return next(res.status(401).json({message : 'Unable access all carts'}))
        }
    }

    //UPDATE USER CART
exports.updateCart = async (req, res, next) => {
    try {
        // const updateData = {
        //     userId : req.body.userId,
        //     productId : req.body.productId,
        //     quantity : req.body.quantity
        // }
        const updatedCart = await Cart.find({userId : req.params.userId}, {$set : {quantity : 5}}, ) 
        // const updatedCart = await Cart.find({userId : req.params.userId}, {productId : 1, quantity : 1, _id : 0}, updateData, {new : true}).sort({_id : -1}).populate({path:'productId', select : 'name-_id'})
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

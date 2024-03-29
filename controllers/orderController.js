const Order = require('../model/Order')


//CREATE NEW ORDER
exports.createOrder = async (req, res, next) => {
    try {
        const order  = new Order({
            userId : req.body.userId,
            cartId : req.body.cartId,
            amount : req.body.amount,
            address : req.body.address,
            status : req.body.status    
        })
        const savedOrder = await order.save()
        return res.status(201).json({data : savedOrder})
    } catch (error) {
        console.log(error)
       return next(res.status(401).json({message : error}))
    }
}

//GET USER ORDERS
exports.getUserOrder = async (req, res, next) => {
    try{
        const userOrder = await Order.find({userId  : req.params.userId},{ _id : 0})
        .sort({_id : -1}).populate({path : 'cartId', populate : {path : 'productId'},
        select : 'productId-_id, quantity' }).populate({path : 'userId', select : 'firstname' }).
        limit(5).exec()

        return res.status(200).json({data : userOrder})
   
    } catch (error) {
        console.log(error)
        return next(res.status(401).json({message : error}))
    }
}

//GET ALL ORDERS
exports.getAllOrders = async (req, res, next) => {
    try{
        const orders = await Order.find({},{}).sort({_id : -1}).populate({path : 'cartId', match : {amount : {$gte : 10000}}, populate : {path : 'productId'}, select : 'productId-_id, quantity' }).populate({path : 'userId', select : 'firstname' }).exec()
        // const orders = await Order.find()

        res.status(200).json({data : orders})
        } catch (error) {
            console.log(error)
            console.log(error)
            return next(res.status(401).json({message : 'Unable access all orders'}))
        }
    }

    //UPDATE USER ORDER
exports.updateOrder = async (req, res, next) => {
    try {
        updateData = {
            "cartId" : req.body.cartId,
            "amount" : req.body.amount,
            "address" : req.body.address,
            "status" : req.body.status
        }
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set : updateData
            },{new : true})
            res.status(200).json({data : updatedOrder})
    } catch (error) {
        return next((res.status(401).json(error)))
    }
}

// DELETE USER ORDER
exports.deleteOrder = async (req, res, next) => {
    try {
        const rmCart = await Order.findByIdAndDelete(req.params.id)
       return res.status(200).json({message : 'delete success'})
    } catch (error) {
        console.log(error)
        return next(res.status(401).json({message : error}))
    }
}

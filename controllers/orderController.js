const Order = require('../models/Order')

const newOrder = async (req, res) => {
    try {
        const order  = await new Order(req.body)
        const savedOrder = await order.save()
        res.status(201).json({data : savedOrder})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

const getUserOrders = async (req, res) => {
    try{
    const userOrders = await Order.find({userId : req.params.userId})
    res.status(200).json({data : userOrders})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

const getAllOrders = async (req, res) => {
    try{
        const order = await Order.find()
        res.status(200).json({data : order})
        } catch (error) {
            res.status(401).json({message : 'Unable access all carts'})
        }
    }

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{new : true})
            res.status(200).json({data : updatedOrder})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)          
    }
}


const deleteOrder = async (req, res) => {
    try {
        const rmOrder= await Order.findByIdAndDelete(req.params.id)
        rmOrder && res.status(200).json({message : 'delete success'})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

const salesStat = async (req, res) => {
try {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(date.setMonth(date.getMonth()-2))

    const sales = await Order.aggregate([
        {$match : {createdAt : {$gt : previousMonth}}},
        {$project : {month : {$month : '$createdAt'}, sales : '$amount'}},
        {$group : {_id : '$month', total : {$sum : '$sales'}}}
    ])
    res.status(201).json({data : sales})

} catch (error) {
    res.status(201).json({error})
}
}

module.exports = {
    newOrder,
    getAllOrders,
    getUserOrders,
    deleteOrder,
    updateOrder,
    salesStat
}
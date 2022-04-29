const Cart = require('../models/Cart')

const newCart = async (req, res) => {
    try {
        const cart  = await new Cart(req.body)
        const savedCart = await cart.save()
        res.status(201).json({data : savedCart})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

const getUserCart = async (req, res) => {
    try{
    const userCart = await Cart.findOne({userId : req.params.userId})
    res.status(200).json({data : userCart})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

const getAllCarts = async (req, res) => {
    try{
        const carts = await Cart.find()
        res.status(200).json({data : carts})
        } catch (error) {
            res.status(401).json({message : 'Unable access all carts'})
        }
    }

const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{new : true})
            res.status(200).json({data : updatedCart})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)          
    }
}


const deleteCart = async (req, res) => {
    try {
        const rmCart= await Cart.findByIdAndDelete(req.params.id)
        rmCart && res.status(200).json({message : 'delete success'})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

module.exports = {
    newCart,
    getAllCarts, 
    getUserCart,
    deleteCart,
    updateCart
}
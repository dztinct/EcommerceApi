const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    cartId : [{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Cart'
            }],
    amount : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'pending'
    }
}, { timestamps : true })

Cart = mongoose.model('Order', orderSchema)

module.exports = Cart
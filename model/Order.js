const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    productId : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : 'Product'
            },
    amount : {
        type : String,
        required : true
    },
    address : {
        type : Object,
        required : true
    },
    status : {
        type : String,
        default : 'pending'
    }
}, { timestamps : true })

Cart = mongoose.model('Order', orderSchema)

module.exports = Cart
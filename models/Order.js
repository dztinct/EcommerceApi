const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    products : [
        {
            productId:{
                type : String,
                required : true
            },
            quantity : {
                type : Number,
                default : 1
            }
        }
    ],
    amount : {
        type : Number,
        required : true
    },
    address : {
        type : Object,
        default : 'pending'
    }
}, { timestamps : true })

Order = mongoose.model('Order', orderSchema)

module.exports = Order
const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Product'
    },
    quantity : {
        type : Number,
        required : true,
        default : 1
    }
}, { timestamps : true })

Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
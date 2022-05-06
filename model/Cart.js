const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : String
    },
    productId : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : 'Product',
                
            }
            // quantity : Number,
}, { timestamps : true })

Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
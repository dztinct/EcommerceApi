const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : String
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
    ]
}, { timestamps : true })

Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Enter product name']
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : [true, 'Enter number']
    },
    image : {
        type : String,
        required : [true, 'Upload an image']
    },
    description : {
        type : String,
        required : [true, 'Give a product description']
    }
  },
  { timestamps : true}
)

Product = mongoose.model('Product', productSchema)

module.exports = Product
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    desc : {
        type : String,
        required : true        
    },
    img : {
        type : String,
        required : true
    },
    categories : {
        type : String,
        required : true,
        // ref: 'Category'
    },
    size : {
        type : String
    },
    color : {
        type : String
    },
    price : {
        type : Number,
        required : true

    }
}, { timestamps : true })

Product = mongoose.model('Product', productSchema) 

module.exports = Product
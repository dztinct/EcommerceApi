const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    }
}, {timestamps : true})

Category = mongoose.model('Category', categorySchema)

module.exports = Category
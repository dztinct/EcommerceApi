const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : [true, 'Please enter username']
    },
    email : {
        type : String,
        required : true,
        unique : [true, 'Please enter email']
    },
    password : {
        type : String,
        required : [true, 'Please enter password']
    },
    isAdmin : {
        type : Boolean,
        required : [false, 'please accept terms']
    }
    
}, {timestamps : true})

User = mongoose.model('User', userSchema)       

module.exports = User
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, 'You have to enter a username']
    },
    firstname : {
        type : String,
        required : [true, 'You have to enter your firstname']
    },
    lastname : {
        type : String,
        required : [true, 'You have to enter your lastname']
    },
    email : {
        type : String,
        required : [true, 'You have to enter your email']
    },
    password : {
        type : String,
        required : [true, 'You have to enter a Password']
    },
    isAdmin : {
        type : Boolean,
        default : false
        // required : [true, 'Please accept terms']
    }
},
{ timestamps : true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
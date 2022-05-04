const User = require('../model/User')
const cryptoJs = require('crypto-js')
const signToken = require('../middlewares/signToken')
require('dotenv').config()

//REGISTER USER
exports.register = async (req, res, next) => {
    try {
        const {email, firstname, lastname, password, username} = req.body
        if(!email || !firstname || !lastname || !password || !username){
            return res.status(401).json({message : 'Please fill in all the fields'})
        }
        if(password.length < 6 || password.length > 12){
            return res.status(401).json({
                message : 'Password should be greater than 6 and less than 8'
            })
        }

        //DATABASE QUERY BY EMAIL IN DB & EMAIL INPUT BY USER
        const emailExist = await User.findOne({email : email});

        //IF EMAIL ALREADY IN USE
        emailExist && 
             res.status(404).json({message : 'This email already exists'})

            //ENCRYPT PASSWORD
        const hashedPassord = cryptoJs.AES.encrypt(password, process.env.PASS_SECRET).toString()

        //SAVE TO DATABASE
        const user = new User({
            email : req.body.email,
            username : req.body.username,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            password : hashedPassord,
            isAdmin : req.body.isAdmin,
        })
        await user.save()

        // const [password, ...others] = user._doc
        res.status(201).json({data : user})
    } catch (error) {
        return next(new Error(error))
    }
}

exports.login = async (req, res, next) => {
   try {
    const {email} = req.body

    if(!email){
        res.status(401).json({message : 'Enter details to login'})
    }

    const user = await User.findOne({email : email})

    !user && res.status(401).json({message : 'Incorrect credentials'})

    unhashPassword = cryptoJs.AES.decrypt(user.password, process.env.PASS_SECRET).toString(cryptoJs.enc.Utf8)
    
    
    unhashPassword !== req.body.password && res.status(401).json({message : 'incorrect credentials'})
    
    const {password, ...others} = user._doc
    
    const token = signToken(user)

    res.status(201).json({
        data : others,
        token
    })
    
   } catch (error) {
    //    console.log(error)
       return next(new Error(error))
   }
}
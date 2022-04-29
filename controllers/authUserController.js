const User = require('../models/User')
const CryptoJs = require('crypto-js')
const signToken = require('../middleware/signToken')
require('dotenv').config()

//REGISTER
exports.register = async (req, res) => {
    try {

        // const {username, email, password} = req.body

        // const emailExist = User.findOne({email : email})
        // const usernameExist = User.findOne({username : username})

        // emailExist && res.status(401).json({message: `${email} already exist`})
        // usernameExist && res.status(401).json({message: `${username} already exist`})

        // if(!username || !email || !password){
        //     res.status(201).json({message : 'please enter all necessary credentials'})
        // }

        const pwdSecret = process.env.PWD_SECRET
        const hashedPassword = CryptoJs.AES.encrypt(req.body.password, pwdSecret).toString()
        const user = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,
            isAdmin : req.body.isAdmin
        })
    
        await user.save()
        res.status(201).json({
            data : user
        })
    } catch (error) {
        res.status(401).json({
            message : 'Sorry, couldn\'t save details, please check credentials and try again'
        })
    }
}

//LOGIN
exports.login = async (req, res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email : email})
        // const user = await User.findOne({email : req.body.email})
        
        !user && res.status(401).json({
            message : 'incorrect credentials'
        })

        const unHash = CryptoJs.AES.decrypt(user.password, process.env.PWD_SECRET).toString(CryptoJs.enc.Utf8)
        req.body.password !== unHash && res.status(401).json({
                message : 'incorrect credentials'
            })

            const token = signToken(user)

            const {password, ...others} = user._doc
            res.status(200).json({
                ...others,
                token
            })
        

    } catch (error) {
        console.log(error)
        res.status(401).json({
            message : 'Cannot login'
        })
    }
}
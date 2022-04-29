const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    try {
        let token
        const authHeader = req.headers.authorization
        if(authHeader){
            token = authHeader.split(' ')[1]
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        //FIND USER WITH THE TOKEN_ID NOT USER_ID
        const user = await User.findOne({id : decode.id})

        !user && res.status(401).json({message : 'Unauthorized user!'})

        req.user = user 

        // user ? req.user = user : res.status(401).json({message : 'Unauthorized user!'})

        return next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message : 'Cannot access, invalid token!'
        })
    }
}

//AFTER TOKEN VERIFICATION, ADMIN CAN ACCESS, LOGGED IN OR NOT


module.exports = verifyToken
const jwt = require('jsonwebtoken');
const User = require('../model/User')
require('dotenv').config()

const verifyToken = async(req, res, next) => {
     try {
        let token;
     
        const authHeader = req.headers.authorization

        if(authHeader){
            token = authHeader.split(' ')[1]
        }
        
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findOne({_id : decode._id})
        
        if(!user){
            return res.status(401).json({message :'You have to login first'})
        } 
        req.user = user
        
        next()

     } catch (error) {
         return next(new Error(error))
     }

}

module.exports = verifyToken
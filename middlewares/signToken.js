const jwt = require('jsonwebtoken')

require('dotenv').config()

const signToken = (user) => {
    return jwt.sign({_id : user.id}, process.env.JWT_SECRET, {
        expiresIn : '3d'
    })
}

module.exports = signToken
const jwt = require('jsonwebtoken')

const signToken = (user) =>{
    return jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {expiresIn : '10d'}
    )
}

module.exports = signToken
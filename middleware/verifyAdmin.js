// const User = require('../models/User')
// exports.verifyAdmin = async (req, res, next) => {
//     const admin = await User.find({isAdmin : true})
//         if(!admin){
//              res.status(401).json({ message : 'Only Admin Access!'})
//         }else{
//          return next()
//         }   
// }

//WHY CAN'T WE CHECK USING THE ABOVE MEANS

exports.verifyAdmin = (...role) => {
    return (req, res, next) => {
        if (role.includes(req.user.isAdmin)){
            return next(
            res.status(401).json({
                message : 'Only Admins can access!'
            })
            )
        }
        next()
    }
}

// module.exports = verifyAdmin
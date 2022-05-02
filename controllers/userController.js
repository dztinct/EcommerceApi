const User = require('../model/User')

exports.getAllUsers = async(req, res, next) => {
    try {
        const allUsers = await User.find()
        return res.status(201).json({data : allUsers})
    
    } catch (error) {
        return next(res.status(401).json(error))
    }
}

exports.getSingleUser = async (req, res, next) => {
    try {
        const getSingleUser = await User.findById(req.params.id)
        return res.status(201).json({data : getSingleUser})
    } catch (error) {
        return next(new Error(error))
    }

}
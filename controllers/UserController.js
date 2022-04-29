const User = require('../models/User')

const getSingleUser = async (req, res) => {
    try{
    const singleUser = await User.findOne({id : req.params.id})
    const {password, ...others} = singleUser._doc
    res.status(200).json({data : others})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

const getAllUsers = async (req, res) => {
    try{
    const allUsers = req.query.new ? await User.find().sort({id : -1}).limit(3) : await User.find()
    allUsers && res.status(200).json({data : allUsers})
    } catch (error) {
        console.log(error)
        // res.status(401).json({message : 'Unable access all users'})
    }
}

const updateUser = async (req, res) => {

    if(req.body.password){
        const pwdSecret = process.env.PWD_SECRET
        req.body.password = CryptoJS.AES.encrypt(req.body.password, pwdSecret).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{new : true})
            res.status(200).json({data : updatedUser})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)          
    }
}


const deleteUser = async (req, res) => {
    try {
        const rmUser = await User.findByIdAndDelete(req.params.id)
        rmUser && res.status(200).json({message : 'delete success'})
    } catch (error) {
        console.log(error)
        res.status(401).json({message : error})
    }
}

const dashboardStat = async (req, res) => {
    try {
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

        const data = await User.aggregate([
            {$match : {createdAt : {$gt : lastYear}}},
            {$project : {month : {$month : '$createdAt'}}},
            {$group : {_id : '$month', total : {$sum : 1}}}
        ])
        res.status(201).json(data)
    } catch (error) {
        res.status(401).json(error)
    }
}

module.exports = {
    deleteUser,
    getSingleUser,
    getAllUsers,
    updateUser,
    dashboardStat
}
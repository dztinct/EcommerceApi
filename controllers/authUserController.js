const User = require('../model/User')

exports.register = async (req, res, next) => {
    try {
        const {email, firstname, lastname, password, username} = req.body
        if(!email || !firstname || !lastname || !password || !username){
            res.status(401).json({message : 'Please fill in all the fields'})
        }

        const emailExist = await User.findOne({email : email});

        emailExist && 
            res.status(404).json({message : 'This email already exists'})

        const user = new User({
            email : req.body.email,
            username : req.body.username,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            password : req.body.password,
            isAdmin : req.body.isAdmin,
        })
        await user.save()
        res.status(201).json({data : user})
    } catch (error) {
        return next(new Error(error))
    }
}
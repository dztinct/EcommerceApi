exports.roles = (...role) => {
    return (req, res, next) => {
        if(role.includes(req.user.isAdmin)){
            return next(
                res.status(401).json({
                    message : 'You are not permitted to perform this action'
                })
            )
        }
        return next()
    }
}
const User = require('../db/models/user')

const authTeacher = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const user = await User.findOne({ _id: token });

        if(user.role !== 1) 
            return res.status(500).json({msg: "Admin resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authTeacher
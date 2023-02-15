const User = require('../db/models/user')

const authAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const user = await User.findOne({ _id: token });
        
        if(user.role !== 2) 
            return res.status(500).json({msg: "Admin resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin
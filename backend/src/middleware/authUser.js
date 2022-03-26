const User = require('../db/models/user')

const authUser = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const user = await User.findOne({ _id: token });
        
        if(user==null) 
            return res.status(500).json({msg: "User access denied, not register."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authUser
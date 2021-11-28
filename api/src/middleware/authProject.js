const Project = require('../db/models/Project')
const authProject = require('../middleware/authProject')

const authProject = async (req, res, next) => {
    try {
        const user = await Project.findOne({_id: req.user.id})

        if(user.role !== 1) 
            return res.status(500).json({msg: "Admin resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authProject
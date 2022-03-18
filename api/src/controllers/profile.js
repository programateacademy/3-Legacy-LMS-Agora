const Profile = require('../db/models/profile')

const controllerProfile = {
    create: async (req, res) => {
        try{
            const {userID,image,linkedin,gitHub,portfolio,competence,dateOfBirth} = req.body

            if(!userID )
                return res.status(400).json({msg: "Please fill in all fields."})
            
                const profile = new Profile({
                    
                    userID,
                    image,
                    linkedin,
                    gitHub,
                    portfolio,
                    competence,
                    dateOfBirth
                                       
                  })
                
                  const savedProfile = await profile.save()
                
                 res.json({msg: "Register success! annuncie created "})
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProfiles: async (req, res) => {
        try {
            const profile = await Profile.find({})
            
            res.json(profile)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProfile: async (req, res) => {
        try {
            const profile = await Profile.find({userID:req.params._id})
            
            res.json(profile)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProfile: async (req, res) => {    
        try {           
            const {image,linkedin,gitHub,portfolio,competence,dateOfBirth}=req.body
            await Profile.findOneAndUpdate(
                {_id : req.params._id}, 
                {   
                    
                    image,
                    linkedin,
                    gitHub,
                    portfolio,
                    competence,
                    dateOfBirth

                });              
                res.json({msg: "Updating announcement successfully!"});   
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProfile: async (req, res) => {
      try {
        await Profile.findByIdAndDelete(req.params._id)
  
        res.json({ msg: 'Deleted successfully announcement'})
      } catch (err) {
        return res.status(500).json({ msg: err.message })
      }
    }
}
    
module.exports = controllerProfile
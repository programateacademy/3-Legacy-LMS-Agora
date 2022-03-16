const Annuncie = require('../db/models/annuncie')

const controllerAnnuncie = {
    create: async (req, res) => {
        try{
            const {userID,cohortID,textAnnouncement,titleAnnouncement,state} = req.body

            if(!textAnnouncement || !titleAnnouncement )
                return res.status(400).json({msg: "Please fill in all fields."})
            
                const annuncie = new Annuncie({
                    
                    
                    cohortID,
                    userID,
                    textAnnouncement,
                    titleAnnouncement,
                    state
                                       
                  })
                
                  const savedAnnuncie = await annuncie.save()
                
                 res.json({msg: "Register success! annuncie created "})
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAnnuncies: async (req, res) => {
        try {
            const annuncies = await Annuncie.find({})
            
            res.json(annuncies)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateAnnuncie: async (req, res) => {    
        try {           
            const {userID,textAnnouncement,titleAnnouncement,state}=req.body
            await Annuncie.findOneAndUpdate(
                {_id : req.params._id}, 
                {
                    userID,
                    textAnnouncement,
                    titleAnnouncement,
                    state

                });              
                res.json({msg: "Updating announcement successfully!"});   
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteAnnuncie: async (req, res) => {
      try {
        await Annuncie.findByIdAndDelete(req.params._id)
  
        res.json({ msg: 'Deleted successfully announcement'})
      } catch (err) {
        return res.status(500).json({ msg: err.message })
      }
    }
}
    
module.exports = controllerAnnuncie
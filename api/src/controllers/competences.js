const Competence = require('../db/models/competences')

const controllerCompetence = {
    create: async (req, res) => {
        try{
            const {cohortID,identifierCompetences,nameCompetences,levelOne,levelTwo,levelThree} = req.body

            if(!identifierCompetences || !nameCompetences )
                return res.status(400).json({msg: "Please fill in all fields."})
            
                const annuncie = new Competence({
                    
                    cohortID,
                    identifierCompetences,
                    nameCompetences,  
                    levelOne,
                    levelTwo,
                    levelThree,                
                                       
                  })
                
                  const savedCompetence = await annuncie.save()
                
                 res.json({msg: "Register success! annuncie created "})
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCompetences: async (req, res) => {
        try {
            const competence = await Competence.find({})
            
            res.json(competence)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCompetence: async (req, res) => {
        try {
            const competence = await Competence.find({cohortID:req.params._id})
            
            res.json( competence)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCompetence: async (req, res) => {    
        try {           
            const {cohortID,identifierCompetences,nameCompetences,levelOne,levelTwo,levelThree}=req.body
            await Competence.findOneAndUpdate(
                {_id : req.params._id}, 
                {   
                    cohortID,
                    identifierCompetences,
                    nameCompetences,  
                    levelOne,
                    levelTwo,
                    levelThree, 

                });              
                res.json({msg: "Updating announcement successfully!"});   
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCompetence: async (req, res) => {
      try {
        await Competence.findByIdAndDelete(req.params._id)
  
        res.json({ msg: 'Deleted successfully announcement'})
      } catch (err) {
        return res.status(500).json({ msg: err.message })
      }
    }
}
    
module.exports = controllerCompetence
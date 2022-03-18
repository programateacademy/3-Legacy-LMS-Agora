const Cohort = require('../db/models/cohort')

const controllerCohort = {
    create: async (req, res) => {
        try{
            const {bootcampID,nameCohort,numberCohort,imageCohort,descriptionCohort,startDateBootcamp,endBootcamp} = req.body

            if(!nameCohort || !numberCohort || !imageCohort || !descriptionCohort || !startDateBootcamp || !endBootcamp)
                return res.status(400).json({msg: "Please fill in all fields."})
            
                const cohort = new Cohort({

                    bootcampID,
                    nameCohort,
                    numberCohort,
                    imageCohort,
                    descriptionCohort,
                    startDateBootcamp,
                    endBootcamp,                    
                                
                  })
            
                  const savedCohorte = await cohort.save()
                
                 res.json({msg: "Register success! cohort created "})
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCohorts: async (req, res) => {
        try {
            const annuncies = await Cohort.find({})
            
            res.json(annuncies)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCohort: async (req, res) => {
        try {
            const annuncies = await Cohort.findById(req.params._id)
            
            res.json(annuncies)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCohort: async (req, res) => {    
        try {           
            const {bootcampID,nameCohort,numberCohort,imageCohort,descriptionCohort,startDateBootcamp,endBootcamp}=req.body
            await Cohort.findOneAndUpdate(
                {_id : req.params._id}, 
                {   
                    bootcampID,
                    nameCohort,
                    numberCohort,
                    imageCohort,
                    descriptionCohort,
                    startDateBootcamp,
                    endBootcamp

                });              
                res.json({msg: "Updating announcement successfully!"});   
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCohort: async (req, res) => {
      try {
        await Cohort.findByIdAndDelete(req.params._id)
  
        res.json({ msg: 'Deleted successfully announcement'})
      } catch (err) {
        return res.status(500).json({ msg: err.message })
      }
    }
}
    
module.exports = controllerCohort
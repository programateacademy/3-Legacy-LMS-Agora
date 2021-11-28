const Deliverie = require('../db/models/deliverie')
const Outcome = require('../db/models/outcome')

const controllerOutcome = {
    create: async (req, res) => {
        try{
            const {id_deliverie, outcomes,cohorte} = req.body

            if(!outcomes || !id_deliverie )
                return res.status(400).json({msg: "Please fill in all fields."})
            
                const outcome = new Outcome({
                    
                    outcomes,
                    id_deliverie,

                  })
                
                  const savedOutcome = await outcome.save()
                
                 res.json({msg: "Register success! outcome created "})
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getOutcome: async (req, res) => {
        const {id_deliverie} = req.params
        try {
            const outcome = await Outcome.find({id_deliverie})
            
            res.json(outcome)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateOutcome: async (req, res) => {
        const {id_deliverie} = req.params
        try {
            const {result} = req.body
            await Outcome.findOneAndUpdate({id_deliverie : id_deliverie}, {
                result
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getOutcomeDash: async (req, res) => {
        const {cohorte} = req.params
        try {
            const outcome = await Outcome.find({cohorte})
            
            res.json(outcome)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
 
}

module.exports = controllerOutcome

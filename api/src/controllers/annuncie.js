const Annuncie = require('../db/models/annuncie')


const controllerAnnuncie = {
    create: async (req, res) => {
        try{
            const {id_user, textAnnouncement,titleAnnouncement,estado} = req.body

            if(!textAnnouncement || !titleAnnouncement )
                return res.status(400).json({msg: "Please fill in all fields."})
            
                const annuncie = new Annuncie({
                    
                    id_user,
                    textAnnouncement,
                    titleAnnouncement,
                    estado
                                       
                  })
                
                  const savedAnnuncie = await annuncie.save()
                
                 res.json({msg: "Register success! annuncie created "})
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
// no tenemos que traer esto por cohorte????
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
            const {id_annuncie, state} = req.body
            await Annuncie.findOneAndUpdate({_id : id_annuncie}, {
                state
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
 
}
    

module.exports = controllerAnnuncie
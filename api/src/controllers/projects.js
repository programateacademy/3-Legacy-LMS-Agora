const Project = require('../db/models/Project')



const controllerProject = {
    create: async (req, res) => {
        try{
            const {name,picture,id_teacher,date,description,competenceFramework,competencies,resources,context,pedagogyModality,performance,evaluationModality,deliverables,tags,cohorte} = req.body

            if(!name || !description || !context )
                return res.status(400).json({msg: "Please fill in all fields."})
            
                const project = new Project({
                    name,
                    picture,
                    id_teacher,
                    date,
                    description,
                    competenceFramework,
                    cohorte,
                    competencies,
                    resources,
                    context,
                    pedagogyModality,
                    performance,
                    evaluationModality,
                    deliverables,
                    tags
                    
                  })
                
                  const savedProject = await project.save()
                
                 res.json({msg: "Register success! project created "})
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getProjects: async (req, res) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getOneProject: async (req, res) => {
        try {
            const {id}=req.params
            const project = await Project.findById(id)
            
            res.json(project)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}
    

module.exports = controllerProject
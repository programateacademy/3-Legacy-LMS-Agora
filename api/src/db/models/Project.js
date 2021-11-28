const { Schema, model } = require('mongoose')

const projectSchema = new Schema({

  name:{
      type:String,
      require:true,
  },
  picture:{
    type:String,
    require:true,
  },
  competenceFramework:{
    type : String
  },
  id_teacher: {
    type: String,
    /* require: true, */    
},
  description: {
    type: String,
    require: true,
  },
  competencies: {
    type: Array
  },
  resources: {
    type: Array
  },
  
  context:{
    type: String,
    require: true,
  },
  pedagogyModality : {
    type: String,
    require: true,
  },
  performance : {
    type: String,
    require: true,
  },
  evaluationModality : {
    type: String,
    require: true,
  },
  deliverables:{
    type: String,
    require: true,
  },
  date:{
    type: Date,
  },

  tags: {
    type: Array
  },
  cohorte:{
    num:{
      type : Number,
    },
    name:{
      type : String,
    }

  },
  
},{    
  timestamps:true
});

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Project = model('Project', projectSchema)

module.exports = Project
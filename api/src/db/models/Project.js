const { Schema, model } = require('mongoose')

const projectSchema = new Schema({

  cohortID: {
    type: Schema.Types.ObjectId,
    ref:'Cohort',
    require: true,
  },
  // ID de formador 
  userID: {
    type: Schema.Types.ObjectId,
    ref:'User',
    require: true,
  },
  titleProject:{
    type:String,
    require:true,
  },
  pictureProject:{
    type:String,
    require:true,
  },
  descriptionProject: {
    type: String,
    require: true,
  },
  tagsProject: {
    type: Array,
    require: true,
  },
  competenceFramework:{
    type : String,
    require: true
  },  
  competencies: {
    type: Array, 
    require: true,
  },
  resources: {
    type: Array,
    require:true,
  },
  contextGeneralReq:{
    type: String,
    require: true,
  },
  contextTechniciansReq:{
    type: String,
    require: true,
  },
  contextExtrasReq:{
    type: String,
    require: true,
  },
  pedagogyModality : {
    type: Array,
    require: true,
  },
  performanceCriterias: {
    type: Array,
    require: true,
  },
  evaluationModality : {
    type: Array,
    require: true,
  },
  deliverablesProject:{
    type: Array,
    require: true,
  },
  date:{
    type: Date,
    require: true,
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
});

const Project = model('Project', projectSchema)

module.exports = Project
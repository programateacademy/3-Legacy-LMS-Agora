const { Schema, model } = require('mongoose')

const annuncieSchema = new Schema({

  cohortID: {
    type: Schema.Types.ObjectId,
    ref:'Cohort',
    require: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref:'User',
    require: true,
  }, 
  titleAnnouncement :{
    type : String,
    require : true
  },  
  textAnnouncement:{
    type:String,
    require:true,
  }, 
    state : { 
        type : Boolean,
        default : true,
    }

  },{    
    timestamps:true
  });
//despues lo revidsamos 
annuncieSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Annuncie = model('Annuncie', annuncieSchema)

module.exports = Annuncie
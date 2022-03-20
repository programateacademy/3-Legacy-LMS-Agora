const { Schema, model } = require('mongoose')

const announcementSchema = new Schema({

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

announcementSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Announcement = model('Announcement', announcementSchema)

module.exports = Announcement
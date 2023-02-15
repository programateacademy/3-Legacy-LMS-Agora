const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  feedback: {
    type: Array,
    require: true,
  },
  deliveryKind: {
    type: String,
    require: true,
  },
  projectID: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  workbookID: {
    type: Schema.Types.ObjectId,
    ref: "Workbook",
  },
  queryID: {
    type: Schema.Types.ObjectId,
    ref: "Query",
  },
  //From Student
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  message: {
    type: String,
    require: true,
  }
},{    
  timestamps:true
});

feedbackSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Feedback = model("Feedback", feedbackSchema);

module.exports = Feedback;

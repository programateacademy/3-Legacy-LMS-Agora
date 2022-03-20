const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  deliveryID: {
    type: Schema.Types.ObjectId,
    ref: "Delivery",
  },
  //UserId from Teacher
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  feedback: {
    type: Array,
    require: true,
  }
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

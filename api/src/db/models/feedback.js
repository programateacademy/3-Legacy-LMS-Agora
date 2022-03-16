const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  deliveryID: {
    type: Schema.Types.ObjectId,
    ref: "Delivery",
  },
  //formador que realiza la o feedback
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  text: {
    type: Array,
    require: true,
  },
  link: {
    type: Array,
    require: true,
  },
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

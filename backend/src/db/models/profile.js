const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  cohortID: {
    type: Schema.Types.ObjectId,
    ref: "Cohort",
    require: true,
  },
  image: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  gitHub: {
    type: String,
  },
  portafolio: {
    type: String,
  },
  competence: {
    type: Array,
  },
  dateOfBirth: {
    type: Date,
  },
});

profileSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;

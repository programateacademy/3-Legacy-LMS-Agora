const { Schema, model } = require("mongoose");

const cohortSchema = new Schema(
  {
    bootcampID: {
      type: Schema.Types.ObjectId,
      ref: "Bootcamp",
      require: true,
    },
    assignedTeachersID: {
      type: Array,
    },
    nameCohort: {
      type: String,
      required: true,
      trim: true,
    },
    numberCohort: {
      type: Number,
      required: true,
    },
    imageCohort: {
      type: String,
    },
    descriptionCohort: {
      type: String,
      required: true,
    },
    startDateBootcamp: {
      type: Date,
      required: true,
    },
    endBootcamp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

cohortSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Cohort = model("Cohort", cohortSchema);
module.exports = Cohort;

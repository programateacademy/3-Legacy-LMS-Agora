const { Schema, model } = require("mongoose");

const competenciesSchema = new Schema(
  {
    cohortID: {
      type: Schema.Types.ObjectId,
      ref: "Cohort",
      required: true,
    },
    identifierCompetences: {
      type: String,
      required: true,
    },
    nameCompetences: {
      type: String,
      required: true,
    },
    levelOne: {
      actions: {
        type: String,
        required: true,
      },
      evaluationCriteria: {
        type: String,
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
    },
    levelTwo: {
      actions: {
        type: String,
        required: true,
      },
      evaluationCriteria: {
        type: String,
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
    },
    levelThree: {
      actions: {
        type: String,
        required: true,
      },
      evaluationCriteria: {
        type: String,
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

competenciesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Competencies = model("Competencies", competenciesSchema);
module.exports = Competencies;

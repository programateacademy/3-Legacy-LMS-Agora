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
      actions1: {
        type: String,
        required: true,
      },
      evaluationCriteria1: {
        type: String,
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
    },
    levelTwo: {
      actions2: {
        type: String,
        required: true,
      },
      evaluationCriteria2: {
        type: String,
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
    },
    levelThree: {
      actions3: {
        type: String,
        required: true,
      },
      evaluationCriteria3: {
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

const { Schema, model } = require("mongoose");

const conpetenciesSchema = new Schema(
  {
    cohortID: {
      type: Schema.Types.ObjectId,
      ref:'Cohort',
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
      approved1:{
        type:Boolean,
        default:false
      }
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
      approved2:{
        type:Boolean,
        default:false
      }
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
      approved3:{
        type:Boolean,
        default:false
      }
    },
  },
  {
    timestamps: true,
  }
);

conpetenciesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Competencies = model("Competencies", conpetenciesSchema);
module.exports = Competencies;

const { Schema, model } = require("mongoose");

const workbookSchema = new Schema(
  {
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
    titleWorkbook: {
      type: String,
      require: true,
    },
    pictureWorkbook: {
      type: String,
      require: true,
    },
    descriptionWorkbook: {
      type: String,
      require: true,
    },
    tagsWorkbook: {
      type: Array,
      require: true,
    },
    basicNotions: {
      type: String,
      require: true,
    },
    environmentalReq: {
      type: Array,
      require: true,
    },
    contextReq: {
      type: Array,
      require: true,
    },
    steps: {
      type: Array,
      require: true,
    },
    challenge: {
      type: String,
      require: true,
    },
    resources: {
      type: Array,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

workbookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//Workbook nombre de la coleccion de la base de datos de mongo
//workbookSchema hace referencia al esquema 

const Workbook = model("Workbook", workbookSchema);

module.exports = Workbook;

const { Schema, model } = require("mongoose");

const querySchema = new Schema(
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
    titleQuery: {
      type: String,
      require: true,
    },
    pictureQuery: {
      type: String,
      require: true,
    },
    tagsQuery: {
      type: Array,
      require: true,
    },
    basicNotions: {
      type: String,
      require: true,
    },
    pathReq: {
      type: Array,
      require: true,
    },
    documentationReq: {
      type: Array,
      require: true,
    },
    importantAspect: {
      type: String,
      require: true,
    },
    challengeTask: {
      type: Array,
      require: true,
    },
    resources: {
      type: Array,
      require: true,
    },
    challengeExtra: {
      type: String,
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

querySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//Workbook nombre de la coleccion de la base de datos de mongo
//workbookSchema hace referencia al esquema

const Query = model("Query",querySchema);

module.exports = Query;

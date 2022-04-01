const { Schema, model } = require("mongoose");

const deliverySchema = new Schema(
  {
    deliveryKind: {
      type: String,
      require: true,
    },
    projectID: {
      type: String,
      // ref: "Project",
    },
    workbookID: {
      type: String,
      // ref: "Workbook",
    },
    queryID: {
      type: String,
      // ref: "Query",
    },
    //From Student
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
    delivery: {
      type: Array,
      require: true,
    },
    message:{
      type:String,
      require:true,
    }

  },
  {
    timestamps: true,
  }
);

deliverySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Delivery = model("Delivery", deliverySchema);

module.exports = Delivery;

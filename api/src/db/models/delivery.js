const { Schema, model } = require("mongoose");

const deliverySchema = new Schema(
  {
    projectID: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    workbookID: {
      type: Schema.Types.ObjectId,
      ref: "Workbook",
    },
    queryID: {
      type: Schema.Types.ObjectId,
      ref: "Query",
    },
    //estudiante que realiza la entrega
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
    text: {
      type: Array,
      require: true,
    },
    link: {
      type: Array,
      require: true,
    },

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

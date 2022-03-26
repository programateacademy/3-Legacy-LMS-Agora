const { Schema, model } = require("mongoose");

const bootcampSchema = new Schema(
  {
    nameBootcamp: {
      type: String,
      required: true,
      trim: true,
    },
    imageBootcamp: {
      type: String,
    },
    descriptionBootcamp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bootcampSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Bootcamp = model("Bootcamp", bootcampSchema);
module.exports = Bootcamp;

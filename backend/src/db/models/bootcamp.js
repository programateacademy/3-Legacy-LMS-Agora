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
      default:
        "https://drive.google.com/uc?export=view&id=13T4DiUeZdghGyHJgeoq6xbHbKiLH8NM8",
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

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    cohortID: {
      type: Schema.Types.ObjectId,
      ref: "Cohort",
    },
    assignedCohortsID: {
      type: Array,
    },
    firstName: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    middleName: {
      type: String,
      maxlength: 45,
    },
    lastName: {
      type: String,
      maxlength: 45,
    },
    secondSurname: {
      type: String,
      maxlength: 45,
    },
    documentType: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: Number,
      minlength: 6,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    contactNumber: {
      type: Number,
       required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    programBootcamp: {
      type: String
    },
    state: {
      ///habilitarlo
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = model("User", userSchema);
module.exports = User;

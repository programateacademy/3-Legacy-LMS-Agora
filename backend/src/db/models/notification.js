const { Schema, model } = require("mongoose");

const notificationSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  estado: {
    ////////mostrar o no mostrar notificacion
    type: Boolean,
    default: true,
  },
});

notificationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Notification = model("Notification", notificationSchema);

module.exports = Notification;

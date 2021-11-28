const { Schema, model } = require('mongoose')

const deliverieSchema = new Schema(
  {
    title :{
      type: String,
      require: true
    },
    id_project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      require: true
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    id_publisher: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    text: {
      type: Array,
      require: true
    },
    link: {
      type: Array,
      require: true
    },
    competencies: {
      type: Schema.Types.ObjectId,
      ref: 'Outcome',
    },
  },
  {
    timestamps: true
  }
)

deliverieSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Deliverie = model('Deliverie', deliverieSchema)

module.exports = Deliverie

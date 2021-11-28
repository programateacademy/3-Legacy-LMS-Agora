const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name!'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please enter your email!'],
      trim: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Please enter your password!']
    },
    middleName: {
      type: String,
      maxlength: 45
    },
    lastName: {
      type: String,
      maxlength: 45
    },
    secondSurname: {
      type: String,
      maxlength: 45
    },
    contactNumber: {
      type: Number
    },
    badges: {
      type: Array,
      default : ["true","false","false"]
      },
    role: {
      type: Number,
      default: 0 // 0 = Estudiante, 1= Admn 2 = Formador 1 = estudiante 2 = egresado, 3 = formador, 4 = mentor 5=monitor 6=entrevistador 7=observador 8=entreobservador =admin
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    program: {
      type: String,
      default: 'Programate'
    },

    cohorte: {
      num: {
        type: Number,
        default: 2
      },
      name: {
        type: String,
        default: 'cohorte 2 la mejor cohorte!!!!! '
      }
    },
    state: {
      ///habilitarlo
      type: Boolean,
      default: true
    },
    deliverie: [{
      type: Schema.Types.ObjectId,
      ref: 'Deliverie',
    }]

  },
  {
    timestamps: true
  }
)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)

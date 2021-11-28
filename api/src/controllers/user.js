const User = require('../db/models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const { CLIENT_URL } = process.env

const controllerUser = {
  register: async (req, res) => {
    try {
      console.log(req.body)
      const { name, email, password, middleName , lastName, secondSurname , contactNumber } = req.body

      if (!name || !email || !password ||  !lastName  || !contactNumber
        )
        return res.status(400).json({ msg: 'Todos los campos son requeridos.' })

      if (!validateEmail(email))
        return res.status(400).json({ msg: 'Correo electronico invalido.' })

      const user = await User.findOne({ email })

      if (user)
        return res.status(400).json({ msg: 'Este correo electronico ya existe .' })

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'La contraseña debe tener al menos 6 caracteres.' })

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = {
        name,
        middleName,
        email,
        passwordHash,
        lastName,
        secondSurname,
        contactNumber
        
      }

      const activation_token = createActivationToken(newUser)

      const url = `${CLIENT_URL}/user/activate/${activation_token}`
      sendMail(email, url, 'Verifica tu correo electronico')

      res.json({
        msg: 'Registro exitoso! para activar tu cuenta, revisa tu correo electronico.'
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },registerAdmin: async (req, res) =>{
        try{
            const {name, email, password, role} = req.body

            if(!name || !email || !password || !role)
                return res.status(400).json({msg: "Todos los campos son obligatorios."})

            if(!validateEmail(email))
                return res.status(400).json({msg: "correo electronico incorrecto."})

            const user = await User.findOne({email})

            if(user) return res.status(400).json({msg: "Este correo electronico ya existe."})

            if(password.length < 6)
                return res.status(400).json({msg: "La contraseña debe tener al menos 6 caracteres."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new User({
                name, email, passwordHash, role
            })

            
            await newUser.save()
            res.json({msg: "El usuario fue creado!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    registerAdmin: async (req, res) =>{
      try{
          const {name, email, password, role} = req.body

          if(!name || !email || !password || !role)
              return res.status(400).json({msg: "Todos los campos son obligatorios."})

          if(!validateEmail(email))
              return res.status(400).json({msg: "correo electronico incorrecto."})

          const user = await User.findOne({email})

          if(user) return res.status(400).json({msg: "El correo electronico ya existe."})

          if(password.length < 6)
              return res.status(400).json({msg: "La contraseña debe tener al menos 6 caracteres."})

          const passwordHash = await bcrypt.hash(password, 12)

          const newUser = new User({
              name, email, passwordHash, role
          })

          
          await newUser.save()
          res.json({msg: "Usuario creado!"})

      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      )

      const { name, email, passwordHash,middleName,lastName,secondSurname,contactNumber
      } = user

      const check = await User.findOne({ email })
      if (check)
        return res.status(400).json({ msg: 'Este correo electronico ya existe.' })

      const newUser = new User({
        name,
        email,
        passwordHash,
        middleName,
        lastName,
        secondSurname,
        contactNumber

      })

      await newUser.save()

      res.json({ msg: 'la cuenta fue activada!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async (req, res) => {
    try {
        console.log(req.body, 'ingresologin')
        const {email, password} = req.body
        const user = await User.findOne({email})
        
        const isMatch =
            user === null ? false : await bcrypt.compare(password, user.passwordHash)
            if (!isMatch) {
                res.status(401).json({
                    error: 'usuario o contraseña invalido'
                })
            }
        
        const refresh_token = createRefreshToken({id: user._id})
        
        res.send({
            email: user.email,
            refresh_token,
            msg: "ingreso exitoso!"
            
        })
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.body.refreshtoken
      if (!rf_token) return res.status(400).json({ msg: 'ingresa ahora!!' })

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: 'ingresa hora!!' })

        const access_token = createAccessToken({ id: user.id })
        res.json({ access_token })
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body
      const user = await User.findOne({ email })
      if (!user)
        return res.status(400).json({ msg: 'Este correo electronico no esta registrado.' })

      const access_token = createAccessToken({ id: user._id })
      const url = `${CLIENT_URL}/user/reset/${access_token}`

      sendMail(email, url, 'Restablece tu contraseña')
      res.json({ msg: 'verifica tu email para cambiar contraseña.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body
      const passwordHash = await bcrypt.hash(password, 12)

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          passwordHash: passwordHash
        }
      )

      res.json({ msg: 'Contraseña cambiada correctamente!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')

      res.json(user)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const users = await User.find().select('-password')

      res.json(users)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUsersAllStudents: async (req, res) => {
    try {
        const users = await User.find({role: 0}).select('-password')
        res.json(users)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
  },
  updateUser: async (req, res) => {
    try {
      const { name, avatar } = req.body
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          name,
          avatar
        }
      )

      res.json({ msg: 'Edicion exitosa!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body

      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          role
        }
      )

      res.json({ msg: 'Edicion exitosa!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id)

      res.json({ msg: 'eliminacion exitosa!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getBadges: async (req, res) => {
    try {
      const users = await User.find().select(['name','badges'])
      
  
  
      res.json(users)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateBadge: async (req, res) => {
    try {
      const { badges } = req.body

      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          badges
        }
      )

      res.json({ msg: 'Update Success!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const createActivationToken = payload => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m'
  })
}

const createAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  })
}

const createRefreshToken = payload => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  })
}



module.exports = controllerUser

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const user = require('./routes/user')
const project = require('./routes/projects')
const annuncie = require('./routes/annuncie')
const deliverie = require('./routes/deliverie')
const outcome = require('./routes/outcome')



// Conection MongoDB
require('./db/mongo')

// Init Express
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(fileUpload({
    useTempFiles: true
}))
app.use(express.static('../frontendagora/build'))
app.use('/api', user)
app.use('/api/agora', project)
app.use('/api/agora', annuncie)
app.use('/api/agora', outcome)
app.use('/api/agora', deliverie)


// Setting
const port = (process.env.PORT || 3005)
app.set('port', port)

// Init Server
app.listen(app.get('port'), (error) => {
  if (error) {
    console.error('Error al iniciar el servidor')
  } else {
    console.log('Servidor iniciado en el puerto:' + port)
  }
})

module.exports = app

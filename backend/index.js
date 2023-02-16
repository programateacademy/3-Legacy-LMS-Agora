require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const user = require('./src/routes/user')
const project = require('./src/routes/projects')
const announcement = require('./src/routes/announcement')
const bootcamp = require('./src/routes/bootcamp')
const workbook = require('./src/routes/workbook')
const query = require('./src/routes/query')
const delivery = require('./src/routes/delivery')
const feedback = require('./src/routes/feedback')
const cohort = require('./src/routes/cohort')
const competence = require('./src/routes/competence')
const profile = require ('./src/routes/profile')
const compression = require('compression');

// Conection MongoDB
require('./src/db/mongo')

// Init Express
const app = express()

// Compression
app.use(compression());

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(fileUpload({
    useTempFiles: true
}))
app.use(express.static('../frontendagora/build'))

//Routes by controllers use api just users action and use api/agora by the others
app.use('/api', user)
app.use('/api/agora', project)
app.use('/api/agora', announcement)
app.use('/api/agora', bootcamp)
app.use('/api/agora', workbook)
app.use('/api/agora', query)
app.use('/api/agora', feedback)
app.use('/api/agora', delivery)
app.use('/api/agora',cohort)
app.use('/api/agora',competence)
app.use('/api/agora',profile)

// Setting
const port = (process.env.PORT || 3005)
app.set('port', port)

app.get('/', (req,res) => {
  res.send('Online')
})

// Init Server
app.listen(app.get('port'), (error) => {
  if (error) {
    console.error('Error al iniciar el servidor')
  } else {
    console.log('Servidor iniciado en el puerto:' + port)
  }
})

module.exports = app

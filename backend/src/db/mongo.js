const mongoose = require('mongoose')

// const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

// const connectionString = NODE_ENV === 'test'
//   ? MONGO_DB_URI_TEST
//   : MONGO_DB_URI

// if (!connectionString) {
//   console.error('Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI que servirá de connection string. En las clases usamos MongoDB Atlas pero puedes usar cualquier base de datos de MongoDB (local incluso).')
// }

const USER = 'agora';
const PASSWORD = 1234;
const MONGO_DB_URI = `mongodb+srv://${USER}:${PASSWORD}@agora.fr0cnoy.mongodb.net/?retryWrites=true&w=majority`

// Conection a mongoDB
mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.log(err)
  })

process.on('uncaughtException', error => {
  console.error(error)
})

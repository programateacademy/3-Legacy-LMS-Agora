var ObjectId = require('mongodb').ObjectID;
const Deliverie = require('../db/models/deliverie')
const Project = require('../db/models/Project')
const User = require('../db/models/user')



const controllerDeleverie = {
  create: async (req, res) => {
    try {
      // const { id_project } = req.params
      const { id_project, title, id_user, id_publisher, link, text } = req.body

    //   if (!text || !id_project || !id_publisher || !id_user)
    //     return res.status(400).json({ msg: 'Please fill in all fields.' })

        
      const user = await User.findOne({ id_user })
      
      const deliverie = new Deliverie({
        title,
        id_project,
        id_user: user._id,
        id_publisher,
        link,
        text
      })

      const savedDeliverie = await deliverie.save()

      user.deliverie = user.deliverie.concat(savedDeliverie._id)
      await user.save()

      res.json({ msg: 'Register success! outcome created ' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  addChat: async (req, res) => {
    try {
      const { id_deliverie } = req.params
      const { text } = req.body

      const deliverieUpdate = await Deliverie.findById(id_deliverie)

      deliverieUpdate.text.push(text)

      await Deliverie.replaceOne(
        { _id: id_deliverie },
        { text: deliverieUpdate.text }
      )

      res.send('Chat Update')
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  addLink: async (req, res) => {
    try {
      const { id_deliverie } = req.params
      const { link } = req.body

      const deliverieUpdate = await Deliverie.findById(id_deliverie)

      deliverieUpdate.link.push(link)

      await Deliverie.replaceOne(
        { _id: id_deliverie },
        { link: deliverieUpdate.link }
      )

      res.send('Link Add')
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getDeliveries: async (req, res) => {
    try {
      const deliverie = await Deliverie.find({}).populate('competencies')

      res.json(deliverie)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getDeliverie: async (req, res) => {
    try {
      const {id_deliverie} = req.params 

      const deliverie = await Deliverie.findById(id_deliverie).populate('competencies')

      res.json(deliverie)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },


  //getAll X student
  getDeliverieStudent: async (req, res) => {
    try {
      
      const { id_user } = req.params
      console.log(id_user)
      const deliverie = await Deliverie.find({ id_user }).populate('competencies')

      res.json(deliverie)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  // getAll X Brief
  getDeliverieProyect: async (req, res) => {
    try {
      const { id_Proyecto } = req.body
      const deliverie = await Deliverie.find({ id_Proyecto })

      res.json(deliverie)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }

  
}

module.exports = controllerDeleverie

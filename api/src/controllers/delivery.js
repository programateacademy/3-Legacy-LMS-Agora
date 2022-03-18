var ObjectId = require('mongodb').ObjectID;
const Delivery = require('../db/models/delivery')
const Project = require('../db/models/Project')
const User = require('../db/models/user')



const controllerDelevery = {
  create: async (req, res) => {
    try {
      // const { id_project } = req.params
      const { id_project, title, id_user, id_publisher, link, text } = req.body

    //   if (!text || !id_project || !id_publisher || !id_user)
    //     return res.status(400).json({ msg: 'Please fill in all fields.' })

        
      const user = await User.findOne({ id_user })
      
      const delivery = new Delivery({
        title,
        id_project,
        id_user: user._id,
        id_publisher,
        link,
        text
      })

      const savedDelivery = await delivery.save()

      user.delivery = user.delivery.concat(savedDelivery._id)
      await user.save()

      res.json({ msg: 'Register success! outcome created ' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  addChat: async (req, res) => {
    try {
      const { id_delivery } = req.params
      const { text } = req.body

      const deliveryUpdate = await Delivery.findById(id_delivery)

      deliveryUpdate.text.push(text)

      await Delivery.replaceOne(
        { _id: id_delivery },
        { text: deliveryUpdate.text }
      )

      res.send('Chat Update')
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  addLink: async (req, res) => {
    try {
      const { id_delivery } = req.params
      const { link } = req.body

      const deliveryUpdate = await Delivery.findById(id_delivery)

      deliveryUpdate.link.push(link)

      await Delivery.replaceOne(
        { _id: id_delivery },
        { link: deliveryUpdate.link }
      )

      res.send('Link Add')
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getDeliveries: async (req, res) => {
    try {
      const delivery = await Delivery.find({}).populate('competencies')

      res.json(delivery)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getDelivery: async (req, res) => {
    try {
      const {id_delivery} = req.params 

      const delivery = await Delivery.findById(id_delivery).populate('competencies')

      res.json(delivery)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },


  //getAll X student
  getDeliveryStudent: async (req, res) => {
    try {
      
      const { id_user } = req.params
      console.log(id_user)
      const delivery = await Delivery.find({ id_user }).populate('competencies')

      res.json(delivery)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  // getAll X Brief
  getDeliveryProject: async (req, res) => {
    try {
      const { id_Project } = req.body
      const delivery = await Delivery.find({ id_Project })

      res.json(delivery)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }

  
}

module.exports = controllerDelevery

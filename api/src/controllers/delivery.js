var ObjectId = require('mongodb').ObjectID;
const Delivery = require('../db/models/delivery')
const Project = require('../db/models/Project')
const Profile = require('../db/models/profile')



const controllerDelevery = {
  create: async (req, res) => {
    try {

      const { projectID,cohortID,workbookID,queryID,userID,text,link } = req.body

       if (!text || !userID || !link || !cohortID )
         return res.status(400).json({ msg: 'Please fill in all fields.' })
        
     
      
      const delivery = new Delivery({
        projectID,
        workbookID,
        cohortID,
        queryID,
        userID,
        text,
        link
      })

      const savedDelivery = await delivery.save()
      const profile = await Profile.findOne({ userID:userID })

      profile.delivery = profile.delivery.concat(savedDelivery._id)
      await profile.save()

      res.json({ msg: 'Register success! delivery created ' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  addChat: async (req, res) => {
    try {
     
      const { text } = req.body

      const delivery = await Delivery.findById(req.params)

      delivery.text = delivery.text.concat(text)
      await delivery.save()
      

      res.send({delivery})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  addLink: async (req, res) => {
    try {
     
      const { link } = req.body

      const delivery = await Delivery.findById(req.params)

      delivery.link = delivery.link.concat(link)
      await delivery.save()
      

      res.send({delivery})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getDeliveries: async (req, res) => {
    try {
      const delivery = await Delivery.find({cohortID:req.params})

      res.json(delivery)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
 //hasta aca trabajamos el 
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

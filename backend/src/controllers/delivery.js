const Delivery = require("../db/models/delivery");
const Profile = require("../db/models/profile");

const controllerDelivery = {
  create: async (req, res) => {
    try {
      const { projectID, cohortID, workbookID, queryID, userID, delivery,message ,deliveryKind } =
        req.body;

      if (!delivery || !userID || !cohortID || !message || !deliveryKind)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const deliveryDoc = new Delivery({
        projectID,
        workbookID,
        cohortID,
        queryID,
        userID,
        delivery,
        message,
        deliveryKind,
      });

      const savedDelivery = await deliveryDoc.save();
     
      res.json({ msg: "Register success! delivery created " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addChat: async (req, res) => {
    try {
      const deliveryNew = await Delivery.findById(req.params._id);

      deliveryNew.delivery = deliveryNew.delivery.concat(deliveryArray);

      await deliveryNew.save();

      res.send({ deliveryNew });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Get all deliveries by Cohort ID
  getDeliveries: async (req, res) => {
    try {
      const deliveryKind = req.body;
      const delivery = await Delivery.find(
        { cohortID: req.params._id },
        { deliveryKind: deliveryKind }
      );

      res.json(delivery);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Get one delivery by deliveryID
  getDelivery: async (req, res) => {
    try {
      const delivery = await Delivery.find({userID:req.params._user});
      if (delivery.length>0) { res.json(delivery);}
    } catch (err) {
      return res.status(500).json(req.body);
    }
  },
  //Get one deliveries by studentID
  getDeliveryStudent: async (req, res) => {
    try {
      const delivery = await Delivery.find({ userID: req.params._id });

      res.json(delivery);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // getAll X activity (Project, Query or Workbook)
  getDeliveryProject: async (req, res) => {
    try {
      const delivery = await Delivery.find({ activityID: req.params._id });

      res.json(delivery);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = controllerDelivery;

const Feedback = require("../db/models/feedback");

const controllerFeedback = {
  create: async (req, res) => {
    try {
      const { deliveryID, feedback, userID } = req.body;

      if (!deliveryID || !feedback || !userID)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const outcome = new Feedback({
        deliveryID,
        feedback,
        userID,
      });

      const savedOutcome = await outcome.save();

      res.json({ msg: "Register success! outcome created " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getOutcome: async (req, res) => {
    try {
      const outcome = await Delivery.findById(req.params._id);

      res.json(outcome);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addChat: async (req, res) => {
    try {
      const { outcomeArray } = req.body;

      const outcomeNew = await Feedback.findById(req.params._id);

      outcomeNew.feedback = outcomeNew.feedback.concat(outcomeArray);

      await outcomeNew.save();

      res.send({ outcomeNew });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = controllerFeedback;

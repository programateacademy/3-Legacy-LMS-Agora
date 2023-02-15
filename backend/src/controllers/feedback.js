const Feedback = require("../db/models/feedback");

const controllerFeedback = {
  create: async (req, res) => {
    try {
      const {
        projectID,
        workbookID,
        queryID,
        userID,
        feedback,
        message,
        deliveryKind,
      } = req.body;

      if (!userID || !message || !deliveryKind)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const outcome = new Feedback({
        projectID,
        workbookID,
        queryID,
        userID,
        feedback,
        message,
        deliveryKind,
      });

      const savedOutcome = await outcome.save();

      res.json({ msg: "Register success! delivery created " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getOutcome: async (req, res) => {
    try {
      const outcome = await Feedback.find({userID:req.params._user});
      if (outcome.length>0) { res.json(outcome);}

      res.json(outcome);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = controllerFeedback;

const Announcement = require("../db/models/announcement");

const controllerAnnouncement = {
  create: async (req, res) => {
    try {
      const { userID, cohortID, textAnnouncement, titleAnnouncement, state } =
        req.body;

      if (!textAnnouncement || !titleAnnouncement)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const announcement = new Announcement({
        cohortID,
        userID,
        textAnnouncement,
        titleAnnouncement,
        state,
      });

      const savedAnnouncement = await announcement.save();

      res.json({ msg: "Register success! Announcement created " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAnnouncement: async (req, res) => {
    try {
      const announcement = await Announcement.findById(req.params._id);

      res.json(announcement);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAnnouncements: async (req, res) => {
    try {
      const announcement = await Announcement.find({cohortID:req.params._id});

      res.json(announcement);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAnnouncement: async (req, res) => {
    try {
      const { userID, textAnnouncement, titleAnnouncement, state } = req.body;
      await Announcement.findOneAndUpdate(
        { _id: req.params._id },
        {
          userID,
          textAnnouncement,
          titleAnnouncement,
          state,
        }
      );
      res.json({ msg: "Updating announcement successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAnnouncement: async (req, res) => {
    try {
      await Announcement.findByIdAndDelete(req.params._id);

      res.json({ msg: "Deleted successfully announcement" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = controllerAnnouncement;

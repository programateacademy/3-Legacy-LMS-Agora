const Bootcamp = require("../db/models/bootcamp");

const controllerBootcamp = {
  create: async (req, res) => {
    try {
      const { nameBootcamp, imageBootcamp, descriptionBootcamp } = req.body;

      if (!descriptionBootcamp || !nameBootcamp)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const bootcamp = new Bootcamp({
        nameBootcamp,
        descriptionBootcamp,
        imageBootcamp,
      });

      const savedBootcamp = await bootcamp.save();

      res.json({ msg: "Register success! Bootcamp created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBootcamps: async (req, res) => {
    try {
      const bootcamps = await Bootcamp.find({});

      res.json(bootcamps);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBootcamp: async (req, res) => {
    try {
      const bootcamp = await Bootcamp.findById(req.params._id);

      res.json(bootcamp);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBootcamp: async (req, res) => {
    try {
      const { nameBootcamp, descriptionBootcamp, imageBootcamp } = req.body;
      await Bootcamp.findOneAndUpdate(
        { _id: req.params._id },
        {
          nameBootcamp,
          descriptionBootcamp,
          imageBootcamp,
        }
      );
      res.json({ msg: "Updating Bootcamp successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBootcamp: async (req, res) => {
    try {
      await Bootcamp.findByIdAndDelete(req.params._id);

      res.json({ msg: "Deleted successfully Bootcamp" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = controllerBootcamp;

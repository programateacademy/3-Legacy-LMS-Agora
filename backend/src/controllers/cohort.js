const Cohort = require("../db/models/cohort");

const controllerCohort = {
  create: async (req, res) => {
    try {
      const {
        bootcampID,
        nameCohort,
        assignedTeachersID,
        numberCohort,
        imageCohort,
        descriptionCohort,
        startDateBootcamp,
        endBootcamp,
      } = req.body;

      if (
        !nameCohort ||
        !numberCohort ||
        !descriptionCohort ||
        !startDateBootcamp ||
        !endBootcamp
      )
        return res.status(400).json({ msg: "Please fill in all fields." });

      const cohort = new Cohort({
        bootcampID,
        assignedTeachersID,
        nameCohort,
        numberCohort,
        imageCohort,
        descriptionCohort,
        startDateBootcamp,
        endBootcamp,
      });

      const savedCohort = await cohort.save();

      res.json({ msg: "Register success! cohort created " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCohorts: async (req, res) => {
    try {
      const cohort = await Cohort.find({ bootcampID: req.params._id });

      res.json(cohort);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCohort: async (req, res) => {
    try {
      const cohort = await Cohort.findById(req.params._id);

      res.json(cohort);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCohort: async (req, res) => {
    try {
      const {
        bootcampID,
        assignedTeachersID,
        nameCohort,
        numberCohort,
        imageCohort,
        descriptionCohort,
        startDateBootcamp,
        endBootcamp,
      } = req.body;
      await Cohort.findOneAndUpdate(
        { _id: req.params._id },
        {
          bootcampID,
          assignedTeachersID,
          nameCohort,
          numberCohort,
          imageCohort,
          descriptionCohort,
          startDateBootcamp,
          endBootcamp,
        }
      );
      res.json({ msg: "Updating Cohort successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCohort: async (req, res) => {
    try {
      await Cohort.findByIdAndDelete(req.params._id);

      res.json({ msg: "Deleted successfully Cohort" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = controllerCohort;

const Workbook = require("../db/models/workbook");

const controllerWorkbook = {
  create: async (req, res) => {
    try {
      const {
        cohortID,
        userID,
        titleWorkbook,
        pictureWorkbook,
        descriptionWorkbook,
        tagsWorkbook,
        basicNotions,
        environmentalReq,
        contextReq,
        steps,
        challenge,
        resources,
        date,
      } = req.body;

      if (
        !cohortID ||
        !userID ||
        !titleWorkbook ||
        !pictureWorkbook ||
        !descriptionWorkbook ||
        !tagsWorkbook ||
        !basicNotions ||
        !environmentalReq ||
        !contextReq ||
        !steps ||
        !challenge ||
        !resources ||
        !date
      )
        return res.status(400).json({ msg: "Please fill in all fields." });

      const workbook = new Workbook({
        cohortID,
        userID,
        titleWorkbook,
        pictureWorkbook,
        descriptionWorkbook,
        tagsWorkbook,
        basicNotions,
        environmentalReq,
        contextReq,
        steps,
        challenge,
        resources,
        date,
      });

      const savedWorkbook = await workbook.save();

      res.json({ msg: "Register success! Workbook created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getWorkbooks: async (req, res) => {
    try {
      const workbooks = await Workbook.find({ cohortID: req.params._id });
      res.json(workbooks);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getWorkbook: async (req, res) => {
    try {
      const workbook = await Workbook.findById(req.params._id);

      res.json(workbook);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateWorkbook: async (req, res) => {
    try {
      const {
        userID,
        titleWorkbook,
        pictureWorkbook,
        descriptionWorkbook,
        tagsWorkbook,
        basicNotions,
        environmentalReq,
        contextReq,
        steps,
        challenge,
        resources,
        date,
      } = req.body;
      await Workbook.findOneAndUpdate(
        { _id: req.params._id },
        {
          userID,
          titleWorkbook,
          pictureWorkbook,
          descriptionWorkbook,
          tagsWorkbook,
          basicNotions,
          environmentalReq,
          contextReq,
          steps,
          challenge,
          resources,
          date,
        }
      );
      res.json({ msg: "Updating Workbook successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteWorkbook: async (req, res) => {
    try {
      await Workbook.findByIdAndDelete(req.params._id);

      res.json({ msg: "Deleted successfully Workbook" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = controllerWorkbook;

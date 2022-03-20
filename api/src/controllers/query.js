const Query = require("../db/models/query");

const controllerQuery = {
  create: async (req, res) => {
    try {
      const {
        cohortID,
        userID,
        titleQuery,
        pictureQuery,
        tagsQuery,
        basicNotions,
        pathReq,
        documentationReq,
        importantAspect,
        challengeTask,
        resources,
        challengeExtra,
        date,
      } = req.body;

      if (
        !cohortID ||
        !userID ||
        !titleQuery ||
        !pictureQuery ||
        !tagsQuery ||
        !basicNotions ||
        !pathReq ||
        !documentationReq ||
        !importantAspect ||
        !challengeTask ||
        !resources ||
        !challengeExtra ||
        !date
      )
        return res.status(400).json({ msg: "Please fill in all fields." });

      const query = new Query({
        cohortID,
        userID,
        titleQuery,
        pictureQuery,
        tagsQuery,
        basicNotions,
        pathReq,
        documentationReq,
        importantAspect,
        challengeTask,
        resources,
        challengeExtra,
        date,
      });

      const savedQuery = await query.save();

      res.json({ msg: "Register success! Query created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getQueries: async (req, res) => {
    try {
      const queries = await Query.find({ cohortID: req.params._id });

      res.json(queries);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getQuery: async (req, res) => {
    try {
      const query = await Query.findById(req.params._id);

      res.json(query);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateQuery: async (req, res) => {
    try {
      const {
        userID,
        titleQuery,
        pictureQuery,
        tagsQuery,
        basicNotions,
        pathReq,
        documentationReq,
        importantAspect,
        challenge,
        resources,
        challengeExtra,
        date,
      } = req.body;
      await Query.findOneAndUpdate(
        { _id: req.params._id },
        {
          userID,
          titleQuery,
          pictureQuery,
          tagsQuery,
          basicNotions,
          pathReq,
          documentationReq,
          importantAspect,
          challenge,
          resources,
          challengeExtra,
          date,
        }
      );
      res.json({ msg: "Updating Query successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteQuery: async (req, res) => {
    try {
      await Query.findByIdAndDelete(req.params._id);

      res.json({ msg: "Deleted successfully Query" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = controllerQuery;

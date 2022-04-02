const Profile = require("../db/models/profile");
const Competences = require("../db/models/competences");

const controllerProfile = {
  getProfiles: async (req, res) => {
    try {
      const profile = await Profile.find({cohortID:req.params._id});

      res.json(profile);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProfile: async (req, res) => {
    try {
      const profile = await Profile.find({ userID: req.params._id });

      res.json(profile);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { image, linkedin, gitHub, portfolio, dateOfBirth } = req.body;
      await Profile.findOneAndUpdate(
        { userID: req.params._id },
        {
          image,
          linkedin,
          gitHub,
          portfolio,
          dateOfBirth,
        }
      );
      res.json({ msg: "Updating Profile successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCompetence: async (req, res) => {
    try {
      const { competenceID, level, approved } = req.body;
      const profile = await Profile.findOne({ userID: req.params._id });
      const competenceArray = await profile.competence;
      const specificCompetence = await competenceArray.map(
        (e) => JSON.stringify(e._id) === `"${competenceID}"`?e:null
      ).filter((item) => item !== null)[0];
      
       if (level === "levelOne") {
        specificCompetence.levelOne.approved = approved;
      }
      if (level === "levelTwo") {
        specificCompetence.levelTwo.approved = approved;
      }
      if (level === "levelThree") {
        specificCompetence.levelThree.approved = approved;
      }

      const specificCompetences = await competenceArray.map(
        (e) => JSON.stringify(e._id) === `"${competenceID}"`?null:e
      ).filter((item) => item !== null);

      const competence = specificCompetences.concat(specificCompetence);
      await Profile.findOneAndUpdate(
        { userID: req.params._id },
        { competence }
      );
      res.json(profile);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

};

module.exports = controllerProfile;

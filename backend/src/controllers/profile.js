const Profile = require("../db/models/profile");
const Competences = require("../db/models/competences");

const controllerProfile = {
  create: async (req, res) => {
    try {
      const {
        userID,
        cohortID,
        image,
        linkedin,
        gitHub,
        portfolio,
        competence,
        dateOfBirth,
      } = req.body;

      if (!userID || !cohortID)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const profile = new Profile({
        cohortID,
        userID,
        image,
        linkedin,
        gitHub,
        portfolio,
        competence,
        dateOfBirth,
      });

      const savedProfile = await profile.save();
      const competenceArray = await Competences.find({ cohortID: cohortID });
      savedProfile.competence = savedProfile.competence.concat(competenceArray);
      await savedProfile.save();

      res.json({ msg: "Register success! Profile created " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
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
      const specificCompetence = await competenceArray.find(
        (e) => (e._id = competenceID)
      );
      if (level === "levelOne") {
        specificCompetence.levelOne.approved = approved;
      }
      if (level === "levelTwo") {
        specificCompetence.levelTwo.approved = approved;
      }
      if (level === "levelThree") {
        specificCompetence.levelThree.approved = approved;
      }

      const competence = competenceArray;
      await Profile.findOneAndUpdate(
        { userID: req.params._id },
        { competence }
      );

      res.json(profile);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      await Profile.findByIdAndDelete(req.params._id);

      res.json({ msg: "Deleted successfully Profile" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = controllerProfile;

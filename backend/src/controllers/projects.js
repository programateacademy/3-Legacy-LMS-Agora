const Project = require("../db/models/project");

const controllerProject = {
  create: async (req, res) => {
    try {
      const {
        cohortID,
        userID,
        titleProject,
        pictureProject,
        descriptionProject,
        tagsProject,
        competenceFramework,
        competences,
        resources,
        contextGeneral,
        contextGeneralReq,
        contextTechniciansReq,
        contextExtrasReq,
        pedagogyModality,
        performanceCriterias,
        evaluationModality,
        deliverablesProject,
        date,
      } = req.body;

      if (
        !cohortID ||
        !userID ||
        !titleProject ||
        !pictureProject ||
        !descriptionProject ||
        !tagsProject ||
        !competenceFramework ||
        !competences ||
        !resources ||
        !contextGeneral ||
        !contextGeneralReq ||
        !contextTechniciansReq ||
        !contextExtrasReq ||
        !pedagogyModality ||
        !performanceCriterias ||
        !evaluationModality ||
        !deliverablesProject ||
        !date
      )
        return res.status(400).json({ msg: "Please fill in all fields." });

      const project = new Project({
        cohortID,
        userID,
        titleProject,
        pictureProject,
        descriptionProject,
        tagsProject,
        competenceFramework,
        competences,
        resources,
        contextGeneral,
        contextGeneralReq,
        contextTechniciansReq,
        contextExtrasReq,
        pedagogyModality,
        performanceCriterias,
        evaluationModality,
        deliverablesProject,
        date,
      });

      const savedProject = await project.save();

      res.json({ msg: "Register success! project created " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getProjects: async (req, res) => {
    try {
      const projects = await Project.find({ cohortID: req.params._id });
      res.json(projects);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
     
    }
  },
  getProject: async (req, res) => {
    try {
      const project = await Project.findById(req.params._id);

      res.json(project);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProject: async (req, res) => {
    try {
      const {
        userID,
        titleProject,
        pictureProject,
        descriptionProject,
        tagsProject,
        competenceFramework,
        competences,
        resources,
        contextGeneral,
        contextGeneralReq,
        contextTechniciansReq,
        contextExtrasReq,
        pedagogyModality,
        performanceCriterias,
        evaluationModality,
        deliverablesProject,
        date,
      } = req.body;
      await Project.findOneAndUpdate(
        { _id: req.params._id },
        {
          userID,
          titleProject,
          pictureProject,
          descriptionProject,
          tagsProject,
          competenceFramework,
          competences,
          resources,
          contextGeneral,
          contextGeneralReq,
          contextTechniciansReq,
          contextExtrasReq,
          pedagogyModality,
          performanceCriterias,
          evaluationModality,
          deliverablesProject,
          date,
        }
      );
      res.json({ msg: "Updating Project successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProject: async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params._id);

      res.json({ msg: "Deleted successfully Project" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = controllerProject;

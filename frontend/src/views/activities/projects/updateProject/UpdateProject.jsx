import React, { useState, useEffect } from "react";
import style from "../../CreateActivity.module.css";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../../api";
import { showErrMsg, showSuccessMsg } from "../../../../utils/notification";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import Swal from "sweetalert2";
const initialState = {
  competences: [],
  titleProject: "",
  pictureProject: "",
  descriptionProject: "",
  tagsProject: [],
  competenceFramework: "",
  resources: [],
  contextGeneral: "",
  contextGeneralReq: [],
  contextTechniciansReq: [],
  contextExtrasReq: [],
  pedagogyModality: [],
  performanceCriterias: [],
  evaluationModality: [],
  deliverablesProject: [],
  date: "",
};

export function UpdateProject() {
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const params = useParams();
  const projectID = params.id;
  let navigate = useNavigate();
  const [project, setProject] = useState(initialState);
  const [image, setImage] = useState();
  const [cohortCompetences, setCohortCompetences] = useState([]);
  const orderedCompetences = cohortCompetences.sort((a, b) => {
    return a.identifierCompetences > b.identifierCompetences ? 1 : -1;
  });
  const [selectedCompetence, setSelectedCompetence] = useState({
    id: "",
    fullNameCompetences: "",
    level: "",
  });
  const [itemArray, setItemArray] = useState("");
  const [competencesIDS, setCompetencesIDS] = useState([]);
  const {
    titleProject,
    pictureProject,
    descriptionProject,
    competenceFramework,
    tagsProject,
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
    success,
  } = project;
  const [objectLink, setObjectLink] = useState({
    nameLink: "",
    link: "",
  });
  const { nameLink, link } = objectLink;
  //fetch project

  const fetchProject = async (url, id) => {
    const res = await apiAgora.get("/api/agora/get-project/" + url, {
      headers: { Authorization: id },
    });
    res.data.date =
      new Date(res.data.date).toLocaleDateString("en-CA") +
      "T" +
      new Date(res.data.date).toLocaleTimeString();
    setProject(res.data);
    setImage(res.data.pictureProject);
    fetchCohortCompetences(res.data.cohortID, id);
  };

  // fetch cohort competences
  const fetchCohortCompetences = async (url, id) => {
    const resCompetencesCohort = await apiAgora.get(
      `/api/agora/get-competences/${url}`,
      {
        headers: { Authorization: id },
      }
    );
    setCohortCompetences(resCompetencesCohort.data);
  };

  // Selecting competences
  const handleChangeSelectLevel = (e) => {
    setSelectedCompetence({ ...selectedCompetence, level: e.target.value });
  };

  const handleChangeSelect = (e) => {
    setSelectedCompetence({
      ...selectedCompetence,
      id: e.target.value,
      fullNameCompetences: e.target.options[e.target.selectedIndex].text,
    });
  };

  //Image
  const handleImage = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
      err: "",
      success: "",
    });
    setImage(value);
  };
  //general info project
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value, err: "", success: "" });
  };
  //add item
  const handleChangeArray = (e) => {
    setItemArray(e.target.value);
  };
  //add link resources
  const handleChangeLink = (e) => {
    const { name, value } = e.target;
    setObjectLink({
      ...objectLink,
      [name]: value,
      err: "",
      success: "",
    });
  };
  const onClickObject = (name) => {
    if (objectLink.link.trim() && objectLink.nameLink.trim()) {
      setProject({
        ...project,
        [name]: [...project[name], objectLink],
        err: "",
        success: "",
      });
    }
  };

  const onClickArray = (name) => {
    if (itemArray.trim()) {
      setProject({
        ...project,
        [name]: [...project[name], itemArray],
        err: "",
        success: "",
      });
      setItemArray("");
    }
  };

  const onClickCompetences = (name) => {
    if (
      !competencesIDS.includes(selectedCompetence.id) &&
      selectedCompetence.id &&
      selectedCompetence.level
    ) {
      setCompetencesIDS((prev) => [...prev, selectedCompetence.id]);
      setProject({
        ...project,
        [name]: [
          ...project[name],
          {
            competenceID: selectedCompetence.id,
            level: selectedCompetence.level,
            name: selectedCompetence.fullNameCompetences,
          },
        ],

        err: "",
        success: "",
      });
    }
  };
  //delete item
  const deleteItemArray = (name, item) => {
    setProject({
      ...project,
      [name]: project[name].filter((e) => e !== item),
    });
  };

  const deleteCompetence = (name, item) => {
    setProject({
      ...project,
      [name]: project[name].filter((e) => e.competenceID !== item),
    });
    setCompetencesIDS(competencesIDS.filter((e) => e !== item));
  };
  useEffect(() => {
    fetchProject(projectID, userID);
  }, [projectID, userID]); // eslint-disable-line react-hooks/exhaustive-deps

  //save project info Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProject({
      ...project,
      competences: project.competences.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      }),
    });
    try {
      if (auth.isTeacher) {
        const res = await apiAgora.put(
          "/api/agora/update-project/" + projectID,
          {
            userID,
            titleProject,
            pictureProject,
            descriptionProject,
            competenceFramework,
            tagsProject,
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
          },
          {
            headers: { Authorization: userID },
          }
        );
        showSuccessMsg(success);
        setProject({ ...project, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setProject({
          ...project,
          err: err.response.data.msg,
          success: "",
        });
    }
  };
  const alertDelete = (projectID) => {
    Swal.fire({
      background: "#E5E5E5",
      title: "¿Desea eliminar este Proyecto?",
      text: "Este proceso no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC02",
      cancelButtonColor: "#010101",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(projectID);
        Swal.fire("Completado", "El proyecto ha sido eliminado", "success");
      }
    });
  };
  const deleteProject = async (projectID) => {
    await apiAgora.delete(`api/agora/delete-project/${projectID}`, {
      headers: { Authorization: userID },
    });
    navigate(-1);
  };
  return (
    <div className={style.formContainer}>
      <div>
        <button className={style.button_return} onClick={() => navigate(-1)}>
          <BsArrowLeftCircle size={30} />
        </button>
      </div>
      <div className={style.buttonDelivery}>
        <button
          type="button"
          className={style.button_clear}
          onClick={() => alertDelete(projectID)}
        >
          Eliminar Proyecto
        </button>
      </div>
      <div className={style.wrapper}>
        <h2 className={style.typing_demo_update_Project}>Modificar Proyecto</h2>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.container}>
          <div className={style.containerOne}>
            <div>
              <div className={style.img_preview}>
                <img
                  className={style.image}
                  src={image}
                  alt="Imagen del proyecto"
                />
              </div>
              <h3>Imagen del Proyecto</h3>
              <input
                className={style.input__imageURL}
                placeholder="Inserta URL de la imagen del proyecto"
                type="text"
                name="pictureProject"
                value={pictureProject}
                onChange={handleImage}
              />
            </div>
            <div className={style.frameofcompetence}>
              <h3>Marco de competencias</h3>
              <input
                type="text"
                name="competenceFramework"
                value={competenceFramework}
                onChange={handleChangeInput}
              />
            </div>
            <div className={style.InitialContainer}>
              <h3>Recursos</h3>
              <div className={style.addResourcesContainer}>
                <h5>Nombre de recurso</h5>
                <input
                  placeholder="..."
                  type="text"
                  name="nameLink"
                  value={nameLink}
                  onChange={handleChangeLink}
                />
                <div className={style.tagsProject}>
                  <h5>Link de recurso</h5>
                  <input
                    placeholder="..."
                    type="text"
                    name="link"
                    value={link}
                    onChange={handleChangeLink}
                  />
                  <button
                    className={style.addTagsProject}
                    type="button"
                    onClick={() => onClickObject("resources")}
                  >
                    <MdOutlineAddCircle size={30} />
                  </button>
                </div>
              </div>
              <div>
                {resources.length !== 0
                  ? resources.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <AiOutlineLink className={style.linkIcon} size={30} />
                        <div className={style.tagText}>
                          <a
                            className={style.tag}
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.nameLink}
                          </a>
                        </div>
                        <button
                          className={style.deleteTag}
                          type="button"
                          onClick={() => deleteItemArray("resources", item)}
                        >
                          <MdDeleteForever size={30} />
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className={style.containerTwo}>
            <div className={style.InitialContainer}>
              <h3>Nombre del Proyecto</h3>
              <input
                placeholder="Nombre del proyecto"
                type="text"
                name="titleProject"
                value={titleProject}
                onChange={handleChangeInput}
              />
              <h3>Descripción del Proyecto</h3>
              <textarea
                name="descriptionProject"
                value={descriptionProject}
                placeholder="Descripción"
                onChange={handleChangeInput}
              ></textarea>
              <h3>Etiquetas del Proyecto</h3>
              <div className={style.tagsProject}>
                <input
                  placeholder="Etiquetas proyecto"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  className={style.addTagsProject}
                  type="button"
                  onClick={() => onClickArray("tagsProject")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div className={style.tagsList}>
                {tagsProject.length !== 0
                  ? tagsProject.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <p className={style.tag}>{item}</p>
                        <button
                          className={style.deleteTag}
                          type="button"
                          onClick={() => deleteItemArray("tagsProject", item)}
                        >
                          <MdDeleteForever size={30} />
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className={style.contextContainer}>
              <h3>Contexto del Proyecto</h3>
              <textarea
                placeholder="Descripción"
                name="contextGeneral"
                value={contextGeneral}
                onChange={handleChangeInput}
              ></textarea>
            </div>
            <h3>Fecha y Hora de Entrega</h3>
            <div className={style.dateTimeDelivery}>
              <input
                placeholder="Fecha de entrega"
                type="datetime-local"
                name="date"
                value={date}
                onChange={handleChangeInput}
              />
            </div>
          </div>
        </div>
        <div className={style.line}></div>
        <div className={style.deliveryContainer}>
          <div className={style.summaryProject}>
            <h3>Requerimientos Generales</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Etiquetas proyecto"
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("contextGeneralReq")}
              >
                <MdOutlineAddCircle size={30} />
              </button>
            </div>
            <div>
              {contextGeneralReq.length !== 0
                ? contextGeneralReq.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>{item}</p>
                      </div>
                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() =>
                          deleteItemArray("contextGeneralReq", item)
                        }
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className={style.summaryProject}>
            <h3>Requerimientos Técnicos</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Etiquetas proyecto"
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("contextTechniciansReq")}
              >
                <MdOutlineAddCircle size={30} />
              </button>
            </div>
            <div>
              {contextTechniciansReq.length !== 0
                ? contextTechniciansReq.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>{item}</p>
                      </div>
                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() =>
                          deleteItemArray("contextTechniciansReq", item)
                        }
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className={style.summaryProject}>
            <h3>Requerimientos Adicionales</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Etiquetas proyecto"
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("contextExtrasReq")}
              >
                <MdOutlineAddCircle size={30} />
              </button>
            </div>
            <div>
              {contextExtrasReq.length !== 0
                ? contextExtrasReq.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>{item}</p>
                      </div>
                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() =>
                          deleteItemArray("contextExtrasReq", item)
                        }
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className={style.summaryProject}>
            <h3>Modalidad Pedagógica</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Etiquetas proyecto"
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("pedagogyModality")}
              >
                <MdOutlineAddCircle size={30} />
              </button>
            </div>
            <div>
              {pedagogyModality.length !== 0
                ? pedagogyModality.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>{item}</p>
                      </div>
                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() =>
                          deleteItemArray("pedagogyModality", item)
                        }
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className={style.summaryProject}>
            <h3>Criterios de Rendimiento</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Descripción"
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("performanceCriterias")}
              >
                <MdOutlineAddCircle size={30} />
              </button>
            </div>
            <div>
              {performanceCriterias.length !== 0
                ? performanceCriterias.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>{item}</p>
                      </div>
                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() =>
                          deleteItemArray("performanceCriterias", item)
                        }
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className={style.summaryProject}>
            <h3>Modalidad de Evaluación</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Descripción"
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("evaluationModality")}
              >
                <MdOutlineAddCircle size={30} />
              </button>
            </div>
            <div>
              {evaluationModality.length !== 0
                ? evaluationModality.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>{item}</p>
                      </div>
                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() =>
                          deleteItemArray("evaluationModality", item)
                        }
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className={style.inputsdeliveries}>
            <h3>Entregables del Proyecto</h3>
            <div className={style.inputDeliveryContainer}>
              <div className={style.inputDelivery}>
                <textarea
                  placeholder="..."
                  type="text"
                  onChange={handleChangeArray}
                />
              </div>
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("deliverablesProject")}
              >
                <MdOutlineAddCircle size={30} />
              </button>
            </div>
            <div>
              {deliverablesProject.length !== 0
                ? deliverablesProject.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>{item}</p>
                      </div>
                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() =>
                          deleteItemArray("deliverablesProject", item)
                        }
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
            <h3>Competencias</h3>

            <div className={style.containerFormadores}>
              <div className={style.select}>
                <select
                  aria-label="Default select example"
                  name="competences"
                  onChange={handleChangeSelect}
                >
                  <option value="" selected>
                    Competencias
                  </option>
                  {orderedCompetences.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.identifierCompetences} {item.nameCompetences}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Default select example"
                  name="level"
                  onChange={handleChangeSelectLevel}
                >
                  <option value="" selected>
                    Nivel
                  </option>
                  <option value={"levelOne"}>Nivel 1</option>
                  <option value={"levelTwo"}>Nivel 2</option>
                  <option value={"levelThree"}>Nivel 3</option>
                </select>
                <button
                  className={style.buttonAdd}
                  type="button"
                  onClick={() => onClickCompetences("competences")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
            </div>
            <div>
              {competences.length !== 0
                ? competences.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>
                          {item.name} - Nivel{" "}
                          {item.level === "levelOne"
                            ? 1
                            : item.level === "levelTwo"
                            ? 2
                            : 3}
                        </p>
                      </div>
                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() =>
                          deleteCompetence("competences", item.competenceID)
                        }
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
            <div className={style.container_submit}>
              <button className={style.buttonCreateProject} type="submit">
                Actualizar proyecto
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

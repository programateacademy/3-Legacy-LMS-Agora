import React, { useState, useEffect } from "react";
import style from "../../CreateActivity.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../../api/index";
import { showErrMsg, showSuccessMsg } from "../../../../utils/notification";
import LazyLoad from "react-lazy-load";

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

export function CreateProject() {
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const params = useParams();
  const cohortID = params.id;
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
  } = project;
  const [objectLink, setObjectLink] = useState({
    nameLink: "",
    link: "",
  });
  const { nameLink, link } = objectLink;

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
    fetchCohortCompetences(cohortID, userID);
  }, [cohortID, userID]);

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
        const res = await apiAgora.post(
          "/api/agora/new-project",
          {
            cohortID,
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
        showSuccessMsg("Nuevo Proyecto Creado","El proyecto se ha creado satisfactoriamente");
        setProject({ ...project, err: "", success: res.data.msg });
        setProject(initialState);
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
  return (
    <div className={style.formContainer}>
      <div>
        <button className={style.button_return} onClick={() => navigate(-1)}>
          <i className="ri-arrow-go-back-line"></i>
        </button>
      </div>
      <div className={style.wrapper}>
        <h2 className={`${style.typing_demo} ${style.titlesGlobales}`}>
          Crear proyecto
        </h2>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.container}>
          <div className={style.containerOne}>
            <div>
              <h3>Imagen del Proyecto</h3>
              <input
                className={style.input__imageURL}
                placeholder="Inserta URL de la imagen del proyecto"
                type="text"
                name="pictureProject"
                value={pictureProject}
                onChange={handleImage}
              />
              <LazyLoad className={style.img_preview}>
                <img
                  className={style.image}
                  src={image}
                  alt="Imagen del proyecto"
                />
              </LazyLoad>
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
                    <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
                  </button>
                </div>
              </div>
              <div>
                {resources.length !== 0
                  ? resources.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <i className={`ri-link-m ${style.linkIcon}`}></i>
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
                          <i className="ri-delete-bin-5-line"></i>
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
                placeholder="..."
                type="text"
                name="titleProject"
                value={titleProject}
                onChange={handleChangeInput}
              />
              <h3>Descripción del Proyecto</h3>
              <textarea
                name="descriptionProject"
                value={descriptionProject}
                placeholder="..."
                onChange={handleChangeInput}
              ></textarea>
              <h3>Etiquetas del Proyecto</h3>
              <div className={style.tagsProject}>
                <input
                  placeholder="..."
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  className={style.addTagsProject}
                  type="button"
                  onClick={() => onClickArray("tagsProject")}
                >
                  <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
                </button>
              </div>
              <div className={style.tagsList}>
                {tagsProject.length !== 0
                  ? tagsProject.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>
                        <button
                          className={style.deleteTag}
                          type="button"
                          onClick={() => deleteItemArray("tagsProject", item)}
                        >
                          <i className="ri-delete-bin-5-line"></i>
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className={style.contextContainer}>
              <h3>Contexto del Proyecto</h3>
              <textarea
                placeholder="..."
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
                placeholder="..."
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("contextGeneralReq")}
              >
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
              </button>
            </div>
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
                      onClick={() => deleteItemArray("contextGeneralReq", item)}
                    >
                      <i className="ri-delete-bin-5-line"></i>
                    </button>
                  </div>
                ))
              : null}
          </div>

          <div className={style.summaryProject}>
            <h3>Requerimientos Técnicos</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="..."
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("contextTechniciansReq")}
              >
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
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
                        <i className="ri-delete-bin-5-line"></i>
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
                placeholder="..."
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("contextExtrasReq")}
              >
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
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
                        <i className="ri-delete-bin-5-line"></i>
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
                placeholder="..."
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("pedagogyModality")}
              >
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
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
                        <i className="ri-delete-bin-5-line"></i>
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
                placeholder="..."
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("performanceCriterias")}
              >
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
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
                        <i className="ri-delete-bin-5-line"></i>
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
                placeholder="..."
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("evaluationModality")}
              >
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
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
                        <i className="ri-delete-bin-5-line"></i>
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
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
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
                        <i className="ri-delete-bin-5-line"></i>
                      </button>
                    </div>
                  ))
                : null}
            </div>
            <h3>Competencias</h3>
            <div className={style.inputDeliveryContainer}>
              <div className={style.select}>
                <div className={style.selectContainer}>
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
                </div>

                <div className={style.selectLevel}>
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
                </div>

                <button
                  className={style.addTagsProject}
                  type="button"
                  onClick={() => onClickCompetences("competences")}
                >
                  <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
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
                        <i className="ri-delete-bin-5-line"></i>
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className={style.container_submit}>
            <button className={style.buttonCreateProject} type="submit">
              Crear Proyecto
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

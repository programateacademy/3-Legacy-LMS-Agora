import React, { useState } from "react";
import style from "./CreateProject.module.css";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import apiAgora from "../../../../api";

const initialState = {
  titleProject: "",
  pictureProject: "",
  descriptionProject: "",
  tagsProject: "",
  competenceFramework: "",
  competencies: "",
  resources: [],
  contextGeneral: "",
  contextGeneralReq: "",
  contextTechniciansReq: "",
  contextExtrasReq: "",
  pedagogyModality: "",
  performanceCriterias: "",
  evaluationModality: "",
  deliverablesProject: "",
  date: "",
};

export function CreateProject() {
  const params = useParams();
  const cohortID = params.id;
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  let navigate = useNavigate();
  const [project, setProject] = useState(initialState);
  const [image, setImage] = useState();
  const [cohortCompetences, setCohortCompetences] = useState([]);
  const [selectedCompetence, setSelectedCompetence] = useState({ id: "", fullNameCompetences: "", level:"" })
  const [addedCompetence, setAddedCompetence] = useState([])
  const [itemArray, setItemArray] = useState("");
  const {
    titleProject,
    pictureProject,
    descriptionProject,
    competenceFramework,
    tagsProject,
    competencies,
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

  // fetch cohort competences
  const fetchCohortCompetences = async () => {
    const resCompetencesCohort = await apiAgora.get(
      `/api/agora/get-competences/${cohortID}`,
      {
        headers: { Authorization: userID },
      }
    );
    setCohortCompetences(resCompetencesCohort.data);
  };

  // Selecting competences
  const handleChangeSelectLevel = (e) => {
    setSelectedCompetence({ ...selectedCompetence,
      level: e.target.value
    }) 
  };

  const handleChangeSelect = (e) => {
    setSelectedCompetence({ ...selectedCompetence, 
      /* id: e.target.value, */
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
  const onClickArray = (name) => {
    setProject({
      ...project,
      [name]: [...project[name], itemArray],
      err: "",
      success: "",
    });
    setItemArray("");
  };
  //delete item
  const deleteItemArray = (name, item) => {
    setProject({
      ...project,
      [name]: project[name].filter((e) => e !== item),
    });
  };
  useEffect(() => {
    fetchCohortCompetences();
  }, []);
  //save project info Backend
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.container}>
          <div className={style.containerOne}>
            <div>
              <div className={style.img_preview}>
                <img className={style.image} src={image} alt="Logo Cohorte" />
              </div>
              <div className={style.file}>
                <input
                  className={style.input__imageURL}
                  placeholder="Inserta URL de la imagen Bootcamp"
                  type="text"
                  name="pictureProject"
                  value={pictureProject}
                  onChange={handleImage}
                />
              </div>
            </div>
            <div>
              <h3>Marco de competencias</h3>

              <input
                type="text"
                name="competenceFramework"
                value={competenceFramework}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <h3>Recursos</h3>
              <div>
                <input
                  placeholder="Link Recurso"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button type="button" onClick={() => onClickArray("resources")}>
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {resources.length !== 0
                  ? resources.map((item, index) => (
                    <div key={index}>
                      <a href={item} target="_blank">
                        {item}
                      </a>
                      <button
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
            <div>
              <input
                placeholder="Fecha de entrega"
                type="date"
                name="date"
                value={date}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className={style.containerTwo}>
            <div>
              <input
                placeholder="Nombre del proyecto"
                type="text"
                name="titleProject"
                value={titleProject}
                onChange={handleChangeInput}
              />

              <textarea
                name="descriptionProject"
                value={descriptionProject}
                placeholder="Descripción"
                onChange={handleChangeInput}
              ></textarea>
              <div>
                <input
                  placeholder="Etiquetas proyecto"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  type="button"
                  onClick={() => onClickArray("tagsProject")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {tagsProject.length !== 0
                  ? tagsProject.map((item, index) => (
                    <div key={index}>
                      <p>{item}</p>
                      <button
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
            <div>
              <h3>Contexto del Proyecto</h3>
              <textarea
                placeholder="Descripción"
                name="contextGeneral"
                value={contextGeneral}
                onChange={handleChangeInput}
              ></textarea>
            </div>
            <div>
              <h3>Requerimientos Generales</h3>
              <div>
                <textarea
                  placeholder="Etiquetas proyecto"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  type="button"
                  onClick={() => onClickArray("contextGeneralReq")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {contextGeneralReq.length !== 0
                  ? contextGeneralReq.map((item, index) => (
                    <div key={index}>
                      <p>{item}</p>
                      <button
                        type="button"
                        onClick={() => deleteItemArray("contextGeneralReq", item)}
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                  : null}
              </div>
            </div>
            <div>
              <h3>Requerimientos Técnicos</h3>
              <div>
                <textarea
                  placeholder="Etiquetas proyecto"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  type="button"
                  onClick={() => onClickArray("contextTechniciansReq")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {contextTechniciansReq.length !== 0
                  ? contextTechniciansReq.map((item, index) => (
                    <div key={index}>
                      <p>{item}</p>
                      <button
                        type="button"
                        onClick={() => deleteItemArray("contextTechniciansReq", item)}
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                  : null}
              </div>
            </div>
            <div>
              <h3>Requerimientos Adicionales</h3>
              <div>
                <textarea
                  placeholder="Etiquetas proyecto"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  type="button"
                  onClick={() => onClickArray("contextExtrasReq")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {contextExtrasReq.length !== 0
                  ? contextExtrasReq.map((item, index) => (
                    <div key={index}>
                      <p>{item}</p>
                      <button
                        type="button"
                        onClick={() => deleteItemArray("contextExtrasReq", item)}
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                  : null}
              </div>
            </div>
            <div>
              <h3>Modalidad Pedagógica</h3>
              <div>
                <textarea
                  placeholder="Etiquetas proyecto"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  type="button"
                  onClick={() => onClickArray("pedagogyModality")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {pedagogyModality.length !== 0
                  ? pedagogyModality.map((item, index) => (
                    <div key={index}>
                      <p>{item}</p>
                      <button
                        type="button"
                        onClick={() => deleteItemArray("pedagogyModality", item)}
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                  : null}
              </div>
            </div>
            <div>
              <h3>Criterios de Rendimiento</h3>
              <div>
                <textarea
                  placeholder="Descripción"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  type="button"
                  onClick={() => onClickArray("performanceCriterias")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {performanceCriterias.length !== 0
                  ? performanceCriterias.map((item, index) => (
                    <div key={index}>
                      <p>{item}</p>
                      <button
                        type="button"
                        onClick={() => deleteItemArray("performanceCriterias", item)}
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                  : null}
              </div>
            </div>
            <div>
              <h3>Modalidad de Evaluación</h3>
              <div>
                <textarea
                  placeholder="Descripción"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  type="button"
                  onClick={() => onClickArray("evaluationModality")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {evaluationModality.length !== 0
                  ? evaluationModality.map((item, index) => (
                    <div key={index}>
                      <p>{item}</p>
                      <button
                        type="button"
                        onClick={() => deleteItemArray("evaluationModality", item)}
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                  : null}
              </div>
            </div>
          </div>
        </div>
        <div className={style.line}></div>
        <div>
          <h3>Entregables del Proyecto</h3>
          <div>
            <textarea
              placeholder="Etiquetas proyecto"
              type="text"
              onChange={handleChangeArray}
            />
            <button
              type="button"
              onClick={() => onClickArray("deliverablesProject")}
            >
              <MdOutlineAddCircle size={30} />
            </button>
          </div>
          <div>
            {deliverablesProject.length !== 0
              ? deliverablesProject.map((item, index) => (
                <div key={index}>
                  <p>{item}</p>
                  <button
                    type="button"
                    onClick={() => deleteItemArray("deliverablesProject", item)}
                  >
                    <MdDeleteForever size={30} />
                  </button>
                </div>
              ))
              : null}
          </div>
        </div>
        <div>
          <h3>Competencias</h3>


          <div className={style.containerFormadores}>
            <div className={style.select}>
              <select
                aria-label="Default select example"
                name="competencies"
                onChange={handleChangeSelect}
              >
                <option value="" selected>
                  Competencias
                </option>
                {cohortCompetences.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.identifierCompetences}{" "}
                    {item.nameCompetences}
                  </option>
                ))}
              </select>
              <select
                aria-label="Default select example"
                name="competencies"
                onChange={handleChangeSelectLevel}
              >
                <option value="" selected>
                  Nivel
                </option>
                  <option value={"levelOne"}>
                  Nivel 1
                  </option>
                  <option value={"levelTwo"}>
                  Nivel 2
                  </option>
                  <option value={"levelThree"}>
                  Nivel 3
                  </option>
              </select>
              <button
                className={style.buttonAdd}
                type="button"
                /* onClick={} */
              >
                <MdOutlineAddCircle size={30} />
              </button>
            </div>
          </div>
          <div>
            {competencies.length !== 0
              ? competencies.map((item, index) => (
                <div key={index}>
                  <p>{item}</p>
                  <button
                    type="button"
                    onClick={() => deleteItemArray("competencies", item)}
                  >
                    <MdDeleteForever size={30} />
                  </button>
                </div>
              ))
              : null}
          </div>
        </div>
        <div className={style.container_submit}>
          <button className={style.buttonCreateProject} type="submit">
            Añadir
          </button>
        </div>
      </form>
    </div>
  );
}

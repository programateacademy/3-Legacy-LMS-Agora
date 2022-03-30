import React, { useState, useEffect } from "react";
import style from "./ViewProject.module.css";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../../api";
import { showErrMsg, showSuccessMsg } from "../../../../utils/notification";

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

export function ViewProject() {
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

  const fetchAdmins = async () => {
    const res = await apiAgora.get("/api/agora/get-project/" + projectID, {
      headers: { Authorization: userID },
    });
    setProject(res.data);
    console.log(res.data);
    setImage(res.data.pictureProject);
    fetchCohortCompetences(res.data.cohortID);
  };

  // fetch cohort competences
  const fetchCohortCompetences = async (cohortID) => {
    const resCompetencesCohort = await apiAgora.get(
      `/api/agora/get-competences/${cohortID}`,
      {
        headers: { Authorization: userID },
      }
    );
    setCohortCompetences(resCompetencesCohort.data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);
  return (
    <div className={style.form}>
      <div className={style.formContainer}>
        <h1>Crear proyecto</h1>
        <div className={style.container}>
          <div className={style.containerOne}>
            <div className={style.img_preview}>
              <img
                className={style.image}
                src={image}
                alt="Imagen del proyecto"
              />
            </div>
            <div className={style.frameofcompetence}>
              <h3>Marco de competencias</h3>
              <p>{competenceFramework}</p>
            </div>
            <div className={style.summaryProject}>
              <h3>Recursos</h3>
              <div>
                {resources.length !== 0
                  ? resources.map((item, index) => (
                      <div
                        key={index}
                        className={style.deleterResourcesContainer}
                      >
                        <a href={item.link} target="_blank">
                          {item.nameLink}
                        </a>
                      </div>
                    ))
                  : null}
              </div>
             
            </div>
            <div className={style.dateTimeDelivery}>
                <h3>fecha de entrega</h3>
                <input
                  // type="datetime-local"
                  name="date"
                  value={date}
                  disabled
                />
            </div>
          </div>
          <div className={style.containerTwo}>
            <div className={style.summaryProject}>
              <h3>Descripcion </h3>
            <p>{descriptionProject}</p>
            </div>
            <div>
              {tagsProject.length !== 0
                ? tagsProject.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <p className={style.tag}>{item}</p>
                    </div>
                  ))
                : null}
            </div>
            <div className={style.contextContainer}>
              <h3>Contexto del Proyecto</h3>
              <p>{contextGeneral}</p>
            </div>
            <div className={style.summaryProject}>
              <h3>Requerimientos Generales</h3>
              <div>
                <h4>contextGeneralReq</h4>
                {contextGeneralReq.length !== 0
                  ? contextGeneralReq.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className={style.summaryProject}>
              <h3>Requerimientos Técnicos</h3>
              <div>
                {contextTechniciansReq.length !== 0
                  ? contextTechniciansReq.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className={style.summaryProject}>
              <h3>Requerimientos Adicionales</h3>
              <div>
                {contextExtrasReq.length !== 0
                  ? contextExtrasReq.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className={style.summaryProject}>
              <h3>Modalidad Pedagógica</h3>
              <div>
                {pedagogyModality.length !== 0
                  ? pedagogyModality.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className={style.summaryProject}>
              <h3>Criterios de Rendimiento</h3>
              <div>
                {performanceCriterias.length !== 0
                  ? performanceCriterias.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className={style.summaryProject}>
              <h3>Modalidad de Evaluación</h3>
              <div className={style.tagsProject}>
                <p>{evaluationModality}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.deliveryContainer}>
          <div className={style.inputsdeliveries}>
            <h3>Entregables del Proyecto</h3>
            <div>
              {deliverablesProject.length !== 0
                ? deliverablesProject.map((item, index) => (
                    <div key={index}>
                      <p>{item}</p>
                    </div>
                  ))
                : null}
                
            </div>
          </div>
          <div>
            {competences.length !== 0
              ? competences.map((item, index) => (
                <div key={index}>
                  <p>
                   {item.name} - Nivel {item.level==="levelOne"?1:item.level==="levelTwo"?2:3}
                  </p>
                </div>
              ))
              : null}
          </div>
        </div>
        
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import style from "../../CreateActivity.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../../api";
import { Button } from "../../../../components/Buttons/Button";
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

export function ViewProject(props) {
  const { teacher } = props;
  const auth = useSelector((state) => state.auth);
  // Variables solamente para realizar las pruebas unitarias en local
  // const userID = "63e3e46a39cb1aea19895659";
  // const projectID = "63eaeb009be3c3a734cc7dc5";
  const params = useParams();
  const userID = auth.user.id;
  const projectID = params.id;
  let navigate = useNavigate();
  const [project, setProject] = useState(initialState);
  const [image, setImage] = useState();

  const {
    titleProject,
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
  };

  useEffect(() => {
    fetchProject(projectID, userID);
  }, [projectID, userID]);
  return (
    <div className={style.formContainer}>
      <div>
        <button className={style.button_return} title='button' onClick={() => navigate(-1)}>
          <i className="ri-arrow-go-back-line"></i>
        </button>
      </div>
      <div className={style.wrapper}>
        <h2 className={`${style.typing_demo_view_Project} ${style.titlesGlobales}`}>
          Proyecto
        </h2>
      </div>
      {!teacher ? (
        <div className={style.buttonDelivery}>
          <Button title="Entregar proyecto" link={`/delivery/project/${projectID}`}/>
        </div>
      ) : null}

      <div className={style.form}>
        <div className={style.container}>
          <div className={style.containerOne}>
            <div>
              <LazyLoad className={style.img_preview}>
                <img className={style.image} src={image} alt="Imagen del proyecto"/>
              </LazyLoad>
            </div>

            {/*General */}
            <div className={style.InitialContainer}>
              <h3>Nombre del Proyecto</h3>
              <h4>{titleProject}</h4>
              <h3>Descripción del Proyecto</h3>
              <h4>{descriptionProject}</h4>
              <h3>Etiquetas del Proyecto</h3>
              <div className={style.tagsList}>
                {tagsProject.length !== 0
                  ? tagsProject.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <p className={style.tag}>{item}</p>
                      </div>
                    ))
                  : null}
              </div>
            </div>

            {/*Marco */}
            <div className={style.res}>
              <div className={style.InitialContainer}>
                <h3>Marco de competencias</h3>
                <h4>{competenceFramework}</h4>
              </div>
            </div>

            {/*Recursos */}
            <div className={style.res}>
              <div className={style.InitialContainer}>
                <h3>Recursos</h3>

                <div>
                  {resources.length !== 0
                    ? resources.map((item, index) => (
                        <div className={style.tagContainer} key={index}>
                          <i className={`ri-link-m ${style.linkIcon}`}></i>
                          <div className={style.tagText}>
                            <a className={style.tag} href={item.link} target="_blank" rel="noreferrer">
                              {item.nameLink}
                            </a>
                          </div>
                          <i className={`ri-link-m ${style.linkIcon}`}></i>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
            {/*Contexto */}
            <div className={style.contextContainer}>
              <h3>Contexto del Proyecto</h3>
              <p>{contextGeneral}</p>
            </div>

            {/*Criterios */}
            <div className={style.summaryProject}>
              <h3>Criterios de Rendimiento</h3>

              <div>
                {performanceCriterias.length !== 0
                  ? performanceCriterias.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className={style.containerTwo}>
            <div className={style.summaryProject}>
              <h3>Fecha y Hora de Entrega</h3>
              <div className={style.dateTimeDelivery}>
                <input
                  placeholder="Fecha de entrega"
                  type="datetime-local"
                  name="date"
                  value={date}
                  disabled
                />
              </div>
            </div>

            <div className={style.summaryProject}>
              <h3>Requerimientos Generales</h3>

              <div>
                {contextGeneralReq.length !== 0
                  ? contextGeneralReq.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>
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
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>
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
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>

            {/*Modalidad */}
            <div className={style.summaryProject}>
              <h3>Modalidad Pedagógica</h3>

              <div>
                {pedagogyModality.length !== 0
                  ? pedagogyModality.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            {/*Mod. Evaluación */}
            <div className={style.summaryProject}>
              <h3>Modalidad de Evaluación</h3>

              <div>
                {evaluationModality.length !== 0
                  ? evaluationModality.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>

        {/*Abajo */}
        <div className={style.deliveryContainer}>
          {/*Entregables*/}
          <div className={style.inputsdeliveries}>
            <h3>Entregables del Proyecto</h3>
            <div>
              {deliverablesProject.length !== 0
                ? deliverablesProject.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>{item}</p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <h3>Competencias</h3>

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
                    </div>
                  ))
                : null}
            </div>
            <div className={style.container_submit}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

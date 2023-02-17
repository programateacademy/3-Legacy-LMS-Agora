import React, { useState, useEffect } from "react";
import style from "../../CreateActivity.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../../api/index";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { Button } from "../../../../components/buttons/Button/Button";
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
  const userID = auth.user.id;
  const params = useParams();
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
        <button className={style.button_return} onClick={() => navigate(-1)}>
          <BsArrowLeftCircle size={30} />
        </button>
      </div>
      <div className={style.wrapper}>
        <h2
          className={`${style.typing_demo_view_Project} ${style.titlesGlobales}`}
        >
          Proyecto
        </h2>
      </div>
      {!teacher ? (
        <div className={style.buttonDelivery}>
          <Button
            title="Entregar proyecto"
            link={`/delivery/project/${projectID}`}
          />
        </div>
      ) : null}

      <div className={style.form}>
        <div className={style.container}>
          <div className={style.containerOne}>
            <div className={style.InitialContainer}>
              <div className={style.img_preview}>
                <img
                  className={style.image}
                  src={image}
                  alt="Imagen del proyecto"
                />
              </div>
              <div className={style.Initial}>
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
            </div>
            <div className={style.InitialContainer}>
              <h3>Marco de competencias</h3>
              <h4>{competenceFramework}</h4>
            </div>
            <div className={style.InitialContainer}>
              <h3>Recursos</h3>

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
                        <AiOutlineLink className={style.linkIcon} size={30} />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className={style.containerTwo}>
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
            <div className={style.contextContainer}>
              <h3>Contexto del Proyecto</h3>
              <p>{contextGeneral}</p>
            </div>
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
        </div>
        <div className={style.line}></div>
        <div className={style.deliveryContainer}>
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

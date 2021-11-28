import React, { useEffect, useState } from "react";
import * as controllerProject from "../../../../controllers/controllerProject";
import { useParams } from "react-router-dom";
import "./showproject.css";
import TitleSectionWithButton from "../../../../componentes/titles/TitleSectionWitButton";
import { useSelector } from "react-redux";

const ShowProject = () => {
  const params = useParams();
  const [projects, setProjects] = useState([]);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const oneproject = async () => {
      try {
        const id = params.id;
        const res = await controllerProject.oneproject(id, token);
        setProjects(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    oneproject();
  }, [params.id, token]);

  let resources = projects.resources;
  let competencies = projects.competencies;

  return (
    <>
    {auth.isTeacher || auth.isStudent ? (
      <TitleSectionWithButton
        name={"Contexto del proyecto"}
        btnName={"Ver las entregas"}
        url={auth.isTeacher  ?  "/entregasFormador " : "/entregasEstudiante"}
      />
      ):(
        ""
      )}
      <div className="viewProjectContainer">
        <div className="allProjectContainer">
          <div className="sectionContainer">
            <div className="imgContainer"></div>
            <p style={{ marginTop: "1rem" }} className="title">
              {projects.name}
            </p>
            <p className="textContent">{projects.description}</p>
            <div className="tagsContainer">
              <ul>
                {projects.tags &&
                  projects.tags[0].map((el, i) => <li key={i}>{el}</li>)}
              </ul>
            </div>
          </div>

          <div className="sectionContainer">
            <div className="Recursos">
              <p className="title">Marco de competencias</p>
              <p className="textContent competenceFramework">
                {projects.competenceFramework}
              </p>
            </div>
          </div>

          <div className="sectionContainer">
            <div className="Recursos">
              <p className="title">Recursos</p>
              <div className="resourcesList">
                <ul style={{ marginLeft: "1.2rem" }}>
                  {resources &&
                    resources.map((el) =>
                      el.map((ele, i) => (
                        <li key={i}>
                          <a href={ele.link} target="_blank" rel="noreferrer">
                            {`Recurso ${i + 1}`}
                          </a>
                        </li>
                      ))
                    )}
                </ul>
              </div>
            </div>
          </div>

          <div className="sectionContainer">
            <div className="Recursos">
              <p className="title">Contexto</p>
              <p className="textContent">{projects.context}</p>
            </div>
          </div>

          <div className="sectionContainer">
            <div className="Recursos">
              <p className="title">Modalidades pedagógicas</p>
              <p className="textContent">{projects.pedagogyModality}</p>
            </div>
          </div>

          <div className="sectionContainer">
            <div className="Recursos">
              <p className="title">Criterios de rendimiento</p>
              <p className="textContent">{projects.performance}</p>
            </div>
          </div>

          <div className="sectionContainer">
            <div className="Recursos">
              <p className="title">Modalidades de evaluación</p>
              <p className="textContent">{projects.evaluationModality}</p>
            </div>
          </div>

          <div className="sectionContainer">
            <div className="Recursos">
              <p className="title">Entregables</p>
              <p className="textContent">{projects.deliverables}</p>
            </div>
          </div>
        </div>

        <div className="square">
          <div className="sectionContainer">
            <div className="Recursos">
              <p className="title">Competencias</p>
              <div className="resourcesList">
                <ul>
                  {competencies &&
                    competencies.map((el) =>
                      el.map((ele, i) => (
                        <li
                          key={i}
                          style={{ listStyle: "none", margin: "0.7rem 0" }}
                        >
                          {ele.competence}:
                          <b className="competenceItem"> {ele.level}</b>
                        </li>
                      ))
                    )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProject;

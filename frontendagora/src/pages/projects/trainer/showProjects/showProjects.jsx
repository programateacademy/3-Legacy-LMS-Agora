import React from "react";
import "./showProjects.css";
import { Link } from "react-router-dom";
import TitleSection from "../../../../componentes/titles/TitleSection";
import TitleSectionWithButton from "../../../../componentes/titles/TitleSectionWitButton";
import { useSelector } from "react-redux";

export const ShowProjects = () => {
  

  const projects = useSelector((state) => state.projects)
  const auth = useSelector((state) => state.auth);
  const { isTeacher, isAdmin } = auth;

  return (
    <>
    {isAdmin || isTeacher ? (
             
      <TitleSectionWithButton
        name={"BRIEFS DE LA PROMO"}
        btnName={"Agregar Proyecto"}
        url={"/crearProyecto"}
      />
      ) : (
        <TitleSection name={"BRIEFS DE LA PROMO"} />
      )}

      <div className="cardsGrid">
        {projects.map((project, i) => (
          <div key={i} className="cardProject">
            <div className="imgProject"></div>
            <div className="cardContent">
              <h5 className="titleProject">{project.name}</h5>
              <div className="descriptionContainer">
                <p className="descriptionProject">{project.description}</p>
              </div>
              <div className="buttonContainer">
                <Link to={`/proyectos/${project.id}`} className="btnProject">
                  Ver mas
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as controllerProject from "../../../../controllers/controllerProject";
import "./showProjects.css";
import { Link } from "react-router-dom";
import TitleSection from "../../../../componentes/titles/TitleSection";

export const ShowProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const listProject = async () => {
      try {
        const res = await controllerProject.listProjects();
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    listProject();
  }, []);

  return (
    <>
      <TitleSection name={"BRIEFS DE LA PROMO"} />
      <div className="cardsGrid">
        {projects.map((project, i) => (
          <div key={i} className="cardProject">
            <div className="imgProject"></div>
            <div className="cardContent">
              <h5 className="titleProject">{project.name}</h5>
              <div className="descriptionContainer">
                <p className="descriptionProject">{project.description}</p>
              </div>
              <Link to={`/proyectos/${project.id}`}>
                <Button variant="warning  font-weight-bold text-2 btn-sm p-2 px-3 btnProject">
                  Ver mas
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

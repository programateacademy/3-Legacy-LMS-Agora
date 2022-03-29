import React, { useState, useEffect } from "react";
import "./CompetencesTable.css";

export function CompetencesTable(props) {
  const { competencesState } = props;
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  
  const orderedCompetences = competencesState.sort((a, b) => {
    return (a.identifierCompetences > b.identifierCompetences)
     ? 1 : -1
  })
  return (
    <>
      <div className="box">
        <div className="img">
          <h1>imagen</h1>
        </div>
        <div className="progreso">
          <div className="barra">
            <label for="file">Progreso de la cohorte</label>
            <progress id="file" value="32" max="100">
              {" "}
              32%{" "}
            </progress>
          </div>
          <div className="barra">
            <label for="file">Tasa de exito de la cohorte</label>
            <progress id="file" value="70" max="100">
              {" "}
              32%{" "}
            </progress>
          </div>
        </div>
      </div>
      <div className="contenedor">
        {orderedCompetences.map((item) => (
          <label className="accordion-wrapper">
            <input type="checkbox" class="accordion" hidden />
            <div className="title">
              <div className="c1">
                <h1>{item.identifierCompetences}</h1>
              </div>
              <div className="descripcion">
                <strong className="">{item.nameCompetences}</strong>
              </div>
              <svg
                viewBox="0 0 256 512"
                width="12"
                title="angle-right"
                className="side-icon"
                fill="white"
              >
                <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
              </svg>
              <svg
                viewBox="0 0 320 512"
                height="24"
                title="angle-down"
                className="down-icon"
                fill="white"
              >
                <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
              </svg>
            </div>
            <div className="content">
              <div className="container">
                <div className="bloc-tabs">
                  <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                  >
                    Nivel 1
                  </button>
                  <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                  >
                    Nivel 2
                  </button>
                  <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                  >
                    Nivel 3
                  </button>
                </div>

                <div className="content-tabs">
                  <div
                    className={
                      toggleState === 1 ? "content  active-content" : "content"
                    }
                  >
                    <div className="text">
                      <h2>Descripción</h2>
                      <p>{item.levelOne.actions1}</p>
                    </div>
                    <div className="text">
                      <h2>Criterios de evaluación</h2>
                      <p>{item.levelOne.evaluationCriteria1}</p>
                    </div>
                  </div>

                  <div
                    className={
                      toggleState === 2 ? "content  active-content" : "content"
                    }
                  >
                    <div className="text">
                      <h2>Descripción</h2>
                      <p>{item.levelTwo.actions2}</p>
                    </div>
                    <div className="text">
                      <h2>Criterios de evaluación</h2>
                      <p>{item.levelTwo.evaluationCriteria2}</p>
                    </div>
                  </div>

                  <div
                    className={
                      toggleState === 3 ? "content  active-content" : "content"
                    }
                  >
                    <div className="text">
                      <h2>Descripción</h2>
                      <p>{item.levelThree.actions3}</p>
                    </div>
                    <div className="text">
                      <h2>Criterios de evaluación</h2>
                      <p>{item.levelThree.evaluationCriteria3}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </>
  );
}

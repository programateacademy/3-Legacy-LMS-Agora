import React, { useState, useEffect } from "react";
import style from "./CompetencesTable.module.css";

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
      <div className={style.contenedor}>
        {orderedCompetences.map((item) => (
          <label className={style.accordion_wrapper}>
            <input type="checkbox" className={style.accordion} hidden />
            <div className={style.title}>
              <div className={style.c1}>
                <h4>{item.identifierCompetences}</h4>
              </div>
              <div className={style.description}>
                <strong className="">{item.nameCompetences}</strong>
              </div>
              <svg
                viewBox="0 0 256 512"
                width="12"
                title="angle-right"
                className={style.side_icon}
                fill="white"
              >
                <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
              </svg>
              <svg
                viewBox="0 0 320 512"
                height="24"
                title="angle-down"
                className={style.down_icon}
                fill="white"
              >
                <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
              </svg>
            </div>
            <div className={style.content}>
              <div className={style.container}>
                <div className={style.bloc_tabs}>
                  <button
                    className={toggleState === 1 ? `${style.tabs} ${style.active_tabs}` : style.tabs}
                    onClick={() => toggleTab(1)}
                  >
                    Nivel 1
                  </button>
                  <button
                    className={toggleState === 2 ? `${style.tabs} ${style.active_tabs}` : style.tabs}
                    onClick={() => toggleTab(2)}
                  >
                    Nivel 2
                  </button>
                  <button
                    className={toggleState === 3 ? `${style.tabs} ${style.active_tabs}` :style.tabs}
                    onClick={() => toggleTab(3)}
                  >
                    Nivel 3
                  </button>
                </div>

                <div className={style.content_tabs}>
                  <div
                    className={
                      toggleState === 1 ? `${style.content}  ${style.active_content}` : style.content
                    }
                  >
                    <div className={style.text}>
                      <h3><u>Descripción</u></h3>
                      <p>{item.levelOne.actions1}</p>
                    </div>
                    <div className={style.text}>
                      <h3><u>Criterios de evaluación</u></h3>
                      <p>{item.levelOne.evaluationCriteria1}</p>
                    </div>
                  </div>

                  <div
                    className={
                      toggleState === 2 ? `${style.content}  ${style.active_content}` : style.content
                    }
                  >
                    <div className={style.text}>
                    <h3><u>Descripción</u></h3>
                      <p>{item.levelTwo.actions2}</p>
                    </div>
                    <div className={style.text}>
                    <h3><u>Criterios de evaluación</u></h3>
                      <p>{item.levelTwo.evaluationCriteria2}</p>
                    </div>
                  </div>

                  <div
                    className={
                      toggleState === 3 ? `${style.content}  ${style.active_content}` : style.content
                    }
                  >
                    <div className={style.text}>
                    <h3><u>Descripción</u></h3>
                      <p>{item.levelThree.actions3}</p>
                    </div>
                    <div className={style.text}>
                    <h3><u>Criterios de evaluación</u></h3>
                      <p>{item.levelThree.evaluationCriteria3}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
  );
}

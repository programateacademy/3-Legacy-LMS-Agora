import { useState } from "react";
import style from  "../ProfileStudent/TableStudent.module.css";

function TableStudent() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className={style.container}>
      <div className={style.bloc_tabs}>
        <button
          className=
          {toggleState === 1
            ? `${style.tabs} ${style.active_tabs}`
            : style.tabs}
          onClick={() => toggleTab(1)}
        >
          Proyectos
        </button>
        <button
          className=
          {toggleState === 2
            ? `${style.tabs} ${style.active_tabs}`
            : style.tabs}
          onClick={() => toggleTab(2)}
        >
          Workbooks
        </button>
        <button
          className=
          {toggleState === 3
            ? `${style.tabs} ${style.active_tabs}`
            : style.tabs}
          onClick={() => toggleTab(3)}
        >
          Consultas
        </button>
      </div>

      <div className= {style.content_tabs}>
        <div
          className=
          {toggleState === 1
            ? `${style.content}  ${style.active_content}`
            : style.content}
        >
          <h2>Proyectos Entregados</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
            vel voluptatum?
          </p>
        </div>

        <div
          className=
          {toggleState === 2
            ? `${style.content}  ${style.active_content}`
            : style.content}
        >
          <h2>Workbooks</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>

        <div
          className=
          {toggleState === 3
            ? `${style.content}  ${style.active_content}`
            : style.content}
        >
          <h2>Consultas Entregados</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
            vel voluptatum?
          </p>
        </div>

      </div>
    </div>
  );
}

export {TableStudent}
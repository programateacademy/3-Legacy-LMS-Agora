import { React, useState } from "react";

import "./ValidateCompetence.css";

const ValidateCompetence = () => {
  const [changeStyle, setChangeStyle] = useState(true);

  const handleChangeValidate = (e) => {
    if (changeStyle) {
      e.target.style.backgroundColor = "green";
      e.target.style.color = "white";
      setChangeStyle(false);
    } else {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "black";
      setChangeStyle(true);
    }
  };

  const handleChangeInvalidate = (e) => {
    if (changeStyle) {
      e.target.style.backgroundColor = "red";
      e.target.style.color = "white";
      setChangeStyle(false);
    } else {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "black";
      setChangeStyle(true);
    }
  };

  return (
    <div className="compentecesMain">
      <b>VALIDAR COMPETENCIA</b>
      <div>
        <div className="Level">
          <p>Maquetar una aplicación</p>
          <b>Nivel 1</b>
        </div>
        <div className="Level">
          <a onClick={handleChangeValidate} className="btnValidate">
            Validar ✔
          </a>
          <a onClick={handleChangeInvalidate} className="btnInvalidate">
            Invalidar X
          </a>
        </div>
      </div>

      <div>
        <div className="Level">
          <p>Estructurar una base de datos</p>
          <b>Nivel 2</b>
        </div>
        <div className="Level">
          <a onClick={handleChangeValidate} className="btnValidate">
            Validar ✔
          </a>
          <a onClick={handleChangeInvalidate} className="btnInvalidate">
            Invalidar X
          </a>
        </div>
      </div>

      <div>
        <div className="Level">
          <p>Desarrollar una interfaz </p>
          <b>Nivel 3</b>
        </div>
        <div className="Level">
          <a onClick={handleChangeValidate} className="btnValidate">
            Validar ✔
          </a>
          <a onClick={handleChangeInvalidate} className="btnInvalidate">
            Invalidar X
          </a>
        </div>
      </div>
    </div>
  );
};

export default ValidateCompetence;

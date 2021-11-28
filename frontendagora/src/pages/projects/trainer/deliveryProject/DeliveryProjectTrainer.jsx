import React from "react";
import { useSelector } from "react-redux";
import TitleSection from "../../../../componentes/titles/TitleSection";
import InputSend from "./addLink/InputSend";
import ValidateCompetence from "./Validate/validateCompetencie/ValidateCompetence";
import "./deliveryStyles.css";

const DeliveryProjectTrainer = () => {
  const projects = useSelector((state) => state.projects);
  const students = useSelector((state) => state.users);

  const newdateFormat = (date) => {
    let newDate = new Date(date).toLocaleDateString();
    return newDate;
  };
  return (
    <>
      <TitleSection name={"ENTREGAS"} />
      <div className="deliveryContainer">
        <div className="selectsContainer">
          <select>
            <option hidden>Ver Proyectos entregados</option>
            {projects.map((el, i) => (
              <option key={i} value={el.name} style={{ padding: "1rem" }}>
                {el.name} - {newdateFormat(el.date)}
              </option>
            ))}
          </select>

          <select>
            <option value="">Selecciona un brief</option>
            <option hidden>Selecciona un brief</option>
            {projects.map((el, i) => (
              <option key={i} value={el.name}>
                {el.name} {el.lastName}
              </option>
            ))}
          </select>

          <select>
            <option value="">Selecciona un estudiante</option>
            <option hidden>Selecciona un estudiante</option>
            {students.map((el, i) => (
              <option key={i} value={el.name}>
                {el.name} {el.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="chatMain">
          <div className="chatContainer">
            <div className="cardChatContainer">
              <h5 className="titleProject">Titulo del Brief</h5>

              <div className="cardStudent">
                <b className="nameUser">Nombre estudiante</b>
                <p className="messageSend">Mensaje enviado</p>
                <div className="linksContainer">
                  <ul>
                    <li>
                      <a href="#!">Link 1</a>
                    </li>
                    <li>
                      <a href="#!">Link 2</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="cardTrainer">
                <b className="nameUser">Nombre Formador</b>
                <p className="messageSend">Mensaje enviado</p>
              </div>

              <div className="cardStudent">
                <b className="nameUser">Nombre estudiante</b>
                <p className="messageSend">Mensaje enviado</p>
              </div>
            </div>

            <InputSend />
          </div>
          <div className="competenciesContainer">
            <ValidateCompetence />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryProjectTrainer;

import React from "react";
import TitleSection from "../../../../componentes/titles/TitleSection";
import AddLink from "./addLink/addLinks";
import "./deliveryStyles.css";
import { useSelector } from "react-redux";
import ValidateCompetence from "../../trainer/deliveryProject/Validate/validateCompetencie/ValidateCompetence";

const DeliveryProjectStudent = () => {
  const projects = useSelector((state) => state.projects);
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
        </div>

        <div className="chatMain">
          <div className="chatContainer">
            <div className="cardChatContainer cardChatContainerStudent">
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
            </div>

            <div className="inputContainer">
              <AddLink />
            </div>
          </div>
          <div className="competenciesContainer">
            <ValidateCompetence />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryProjectStudent;

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CompetenceRow from "./CompetenceRow";
import "./competenceStyles.css";

const CompetenceForm = ({ getCompetencies }) => {
  const competenciesList = [
    "C1. Maquetar una aplicación",
    "C2. Crear una interfaz de usuario web estática y adaptable",
    "C3. Desarrollar una interfaz de usuario web dinámica",
    "C4. Crear una interfaz de usuario con una solución de gestión de contenidos o de e-comercio",
    "C5. Crear una base de datos",
    "C6. Desarrollar los componentes de acceso a los datos",
    "C7. Desarrollar la parte back-end de una aplicación web o móvil",
    "C8. Desarrollar e implementar componentes en una aplicación de gestión de contenidos o de comercio electrónico",
  ];

  const [competencies, setCompetencies] = useState([]);
  const [array, setArray] = useState([]);

  const handleOptionChange = (e) => {
    setCompetencies({ ...competencies, competence: e.target.value });
  };

  const handleLevelChange = (e) => {
    setCompetencies({ ...competencies, level: e.target.value });
  };

  const handleData = (e) => {
    e.preventDefault();

    if (!competencies.competence || !competencies.level) {
      alert("No seleccionaste alguna opción");
      return;
    }
    setArray([...array, competencies]);
  };

  const removeCompetence = (index) => {
    const competencesList = [...array];
    competencesList.splice(index, 1);
    setArray(competencesList);

    console.log(array);
  };

  return (
    <>
      <div>
        <div>
          <select onChange={handleOptionChange} className="selectCompetencies">
            <option hidden>Selecciona una competencia ...</option>
            {competenciesList.map((competence, x) => (
              <option key={x} value={competence} name="competence">
                {competence}
              </option>
            ))}
          </select>
          <div />
        </div>
        <div className="Levels">
          <div className="LevelsContainer">
            <label htmlFor="one">
              <input
                type="radio"
                name="competencies"
                value="nivel 1"
                onChange={handleLevelChange}
              />
              Nivel 1
            </label>
            <label htmlFor="two">
              <input
                type="radio"
                name="competencies"
                value="nivel 2"
                onChange={handleLevelChange}
              />
              Nivel 2
            </label>
            <label htmlFor="three">
              <input
                type="radio"
                name="competencies"
                value="nivel 3"
                onChange={handleLevelChange}
              />
              Nivel 3
            </label>
          </div>
          <Button
            variant="warning  font-weight-bold text-2 btn-sm p-2 px-3"
            onClick={handleData}
          >
            Agregar
          </Button>
        </div>
      </div>
      <div>
        <CompetenceRow
          array={array}
          removeCompetence={removeCompetence}
          getCompetencies={getCompetencies}
        />
      </div>
    </>
  );
};

export default CompetenceForm;

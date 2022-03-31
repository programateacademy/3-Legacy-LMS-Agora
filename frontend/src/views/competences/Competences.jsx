import React, { useEffect, useState } from "react";
import styles from "./competences.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import apiAgora from "../../api";
import { useSelector } from "react-redux";
import { showErrMsg, showSuccessMsg } from "../../utils/notification";
import { CompetencesLabel } from "./CompetencesLabel";

export function Competences() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const params = useParams();
  const cohortID = params.id;
  const [nameCohort, setNameCohort] = useState("");
  const [competence, setCompetence] = useState([]);
  const [nameBootcamp, setNameBootcamp] = useState("");
  const [identifierCompetences, setIdentifierCompetences] = useState({});
  const [descriptionBootcamp, setDescriptionBootcamp] = useState("");
  const [levelOne, setLevelOne] = useState({});
  const [levelTwo, setLevelTwo] = useState({});
  const [levelThree, setLevelThree] = useState({});
  const [competences, setCompetences] = useState({});
  const [cohortCompetences, setCohortCompetences] = useState([]);
  
  let navigate = useNavigate();

  const fetchCohortName = async () => {
    const resName = await apiAgora.get(`/api/agora/get-cohort/${cohortID}`, {
      headers: { Authorization: id_user },
    });
    setNameCohort(resName.data.nameCohort);
    const res2Name = await apiAgora.get(
      `/api/agora/get-bootcamps/${resName.data.bootcampID}`,
      {
        headers: { Authorization: id_user },
      }
    );
    setNameBootcamp(res2Name.data.nameBootcamp);
    setDescriptionBootcamp(res2Name.data.descriptionBootcamp);
  };

  const fetchCohortCompetences = async (cohortID) => {
    const resCompetencesCohort = await apiAgora.get(
      `/api/agora/get-competences/${cohortID}`,
      {
        headers: { Authorization: id_user },
      }
    );
    setCohortCompetences(resCompetencesCohort.data);
  };

  const orderedCompetences = cohortCompetences.sort((a, b) => {
    return (a.identifierCompetences > b.identifierCompetences)
     ? 1 : -1
  })

  const { caracteristica, number } = competence;

  const { nameCompetences, success } = competences;

  const { actions1, evaluationCriteria1 } = levelOne;

  const { actions2, evaluationCriteria2 } = levelTwo;

  const { actions3, evaluationCriteria3 } = levelThree;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCompetence({ ...competence, [name]: value, err: "", success: "" });
  };
  const handleChangeInputLevelOne = (e) => {
    const { name, value } = e.target;
    setLevelOne({ ...levelOne, [name]: value, err: "", success: "" });
  };

  const handleChangeInputLevelTwo = (e) => {
    const { name, value } = e.target;
    setLevelTwo({ ...levelTwo, [name]: value, err: "", success: "" });
  };
  const handleChangeInputLevelThree = (e) => {
    const { name, value } = e.target;
    setLevelThree({ ...levelThree, [name]: value, err: "", success: "" });
  };
  const handleChangeName = (e) => {
    const { name, value } = e.target;
    setCompetences({ ...competences, [name]: value, err: "", success: "" });
  };

  useEffect(() => {
    fetchCohortName();
    fetchCohortCompetences(cohortID);
  }, []);

  useEffect(() => {
    setIdentifierCompetences(competence.caracteristica + competence.number);
  }, [competence]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (auth.isAdmin) {
        const res = await apiAgora.post(
          "/api/agora/new-competence",
          {
            cohortID,
            identifierCompetences,
            nameCompetences,
            levelOne,
            levelTwo,
            levelThree,
          },
          {
            headers: { Authorization: id_user },
          }
        );
        console.log(identifierCompetences);
        showSuccessMsg(success);
        setCompetence({ ...competence, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setCompetence({
          ...competence,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  return (
    <div className={styles.globalContainer}>
      <div className={styles.container_register}>
        <div className={styles.Container}>
          <button className={styles.button_return} onClick={() => navigate(-1)}>
            <BsArrowLeftCircle size={30} />
          </button>
          <h1>{nameBootcamp}</h1>
        </div>
        <h2>Crear competencias para la Cohorte {nameCohort}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.containerSectionFirst}>
            <h3>{descriptionBootcamp}</h3>
            <div className={styles.containerGeneral}>
              <div className={styles.numeral}>
                <select
                  className={styles.form_select}
                  aria-label="Default select example"
                  name="caracteristica"
                  value={caracteristica}
                  onChange={handleChangeInput}
                >
                  <option selected>..</option>
                  <option value="T">T</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className={styles.inputName}>
                <div className={styles.input_register}>
                  <input
                    type="Number"
                    placeholder="Numero"
                    name="number"
                    value={number}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className={styles.inputDescription}>
                <div className={styles.input_register}>
                  <input
                    type="text"
                    placeholder="Nombre"
                    name="nameCompetences"
                    value={nameCompetences}
                    onChange={handleChangeName}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.containerInputAddCompetence}>
            <h3>Nivel 1</h3>
            <p>Grupo de acciones</p>
            <textarea
              placeholder="Descripción:"
              name="actions1"
              value={actions1}
              onChange={handleChangeInputLevelOne}
            />
            <p>Criterios de evaluacion</p>
            <textarea
              placeholder="Descripción:"
              name="evaluationCriteria1"
              value={evaluationCriteria1}
              onChange={handleChangeInputLevelOne}
            />
            <h3>Nivel 2</h3>
            <p>Grupo de acciones</p>
            <textarea
              placeholder="Descripción:"
              name="actions2"
              value={actions2}
              onChange={handleChangeInputLevelTwo}
            />
            <p>Criterios de evaluacion</p>
            <textarea
              placeholder="Descripción:"
              name="evaluationCriteria2"
              value={evaluationCriteria2}
              onChange={handleChangeInputLevelTwo}
            />
            <h3>Nivel 3</h3>
            <p>Grupo de acciones</p>
            <textarea
              placeholder="Descripción:"
              name="actions3"
              value={actions3}
              onChange={handleChangeInputLevelThree}
            />
            <p>Criterios de evaluacion</p>
            <textarea
              placeholder="Descripción:"
              name="evaluationCriteria3"
              value={evaluationCriteria3}
              onChange={handleChangeInputLevelThree}
            />
          </div>
          <div className={styles.container__button}>
            <button className={styles.button_submit_register} type="submit">
              ENVIAR
            </button>
          </div>
        </form>
        <hr />
        <div className={styles.container__frameOfReference}>
          <h2>Competencias Asignadas</h2>
          {orderedCompetences.map((item, index) => (
            <CompetencesLabel
              key={index}
              identifierCompetence={item.identifierCompetences}
              competenceID={item.id}
              adminID={id_user}
              name={item.nameCompetences}
              fetchCohortCompetence={()=>fetchCohortCompetences(cohortID)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

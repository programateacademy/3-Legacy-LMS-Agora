import React, { useEffect, useState } from "react";
import styles from "./competences.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { textarea } from "../../components/input/textarea";
import { BsArrowLeftCircle } from "react-icons/bs";
import apiAgora from "../../api";
import { useSelector } from "react-redux";
import { showErrMsg, showSuccessMsg } from "../../utils/notification";


export function CompetencesUpdate() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const params = useParams();
  const competenceCohortID = params.id;

  const [levelOne, setLevelOne] = useState({});
  const [levelTwo, setLevelTwo] = useState({});
  const [levelThree, setLevelThree] = useState({});
  const [competences, setCompetences] = useState({});

  const { nameCompetences, success } = competences;

  const { actions1, evaluationCriteria1 } = levelOne;

  const { actions2, evaluationCriteria2 } = levelTwo;

  const { actions3, evaluationCriteria3 } = levelThree;

  let navigate = useNavigate();

  const fetchCohortCompetence = async () => {
    const resCompetencesCohort = await apiAgora.get(
      `/api/agora/get-competence/${competenceCohortID}`,
      {
        headers: { Authorization: id_user },
      }
    );
    setLevelOne(resCompetencesCohort.data.levelOne);
    setLevelTwo(resCompetencesCohort.data.levelTwo);
    setLevelThree(resCompetencesCohort.data.levelThree);
    setCompetences({ ...competences, nameCompetences: resCompetencesCohort.data.nameCompetences});
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
    fetchCohortCompetence()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (auth.isAdmin) {
        const res = await apiAgora.put(
          "/api/agora/update-competence/" + competenceCohortID,
          {
            nameCompetences,
            levelOne,
            levelTwo,
            levelThree,
          },
          {
            headers: { Authorization: id_user },
          }
        );
        showSuccessMsg(success);
        setCompetences({ ...competences, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setCompetences({
          ...competences,
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
        </div>
        <h2>Crear competencias para la Cohorte</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.containerSectionFirst}>
            <div className={styles.containerGeneral}>
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
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./competences.module.css";
import { Input } from "../../components/input/Input";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../../components/input/Textarea";
import { BsArrowLeftCircle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import apiAgora from "../../api";
import { useSelector } from "react-redux";
import { showErrMsg, showSuccessMsg } from "../../utils/notification";

const initialState = {
  err: "",
  success: "",
  identifierCompetences: "",
  nameCompetences: "",
  levelOne: {
    actions: "",
    evaluationCriteria: "",
    approved: false,
  },
  levelTwo: {
    actions: "",
    evaluationCriteria: "",
    approved: false,
  },
  levelThree: {
    actions: "",
    evaluationCriteria: "",
    approved: false,
  },
};

export function Competences() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const params = useParams();
  const cohortID = params.id;
  const [nameCohort, setNameCohort] = useState("");
  const [competences, setCompetences] = useState(initialState);
  const [bootcampID, setBootcampID] = useState("");
  const [nameBootcamp, setNameBootcamp] = useState("");
  const [levelOne, setLevelOne] = useState({});
  const [levelTwo, setLevelTwo] = useState({});
  const [levelThree, setLevelThree] = useState({});
  const identifierCompetences = competences.caracteristica + competences.number;
  const [competence, setCompetence] = useState([]);

  let navigate = useNavigate();

  const fetchCohortName = async () => {
    const resName = await apiAgora.get(`/api/agora/get-cohort/${cohortID}`, {
      headers: { Authorization: id_user },
    });
    setNameCohort(resName.data.nameCohort);
    setBootcampID(resName.data.bootcampID);
  };

  const fetchBootcampName = async () => {
    const resName = await apiAgora.get(
      `/api/agora/get-bootcamps/${bootcampID}`,
      {
        headers: { Authorization: id_user },
      }
    );
    setNameBootcamp(resName.data.nameBootcamp);
  };

  const { caracteristica, number } = competences;

  const { nameCompetences, err, success } = competence;

  const { actions1, evaluationCriteria1 } = levelOne;

  const { actions2, evaluationCriteria2 } = levelTwo;

  const { actions3, evaluationCriteria3 } = levelThree;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCompetences({ ...competences, [name]: value, err: "", success: "" });
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
    setCompetence({ ...competence, [name]: value, err: "", success: "" });
  };

  useEffect(() => {
    fetchCohortName();
    fetchBootcampName();
  }, []);

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
      <Link className={styles.button_return} to={() => navigate(-1)}>
        <BsArrowLeftCircle /> Volver
      </Link>

      <h2>Crear/Agregar competencias para la Cohorte {nameCohort}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.containerSectionFirst}>
          <h2>{nameBootcamp}</h2>
          <div className={styles.containerGeneral}>
            <div className={styles.numeral}>
              <select
                className={styles.form_select}
                aria-label="Default select example"
                name="caracteristica"
                value={caracteristica}
                onChange={handleChangeInput}
              >
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
                  min='1'
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
          <Textarea
            placeholder="Descripción:"
            name="actions1"
            value={actions1}
            onChange={handleChangeInputLevelOne}
          />
          <p>Criterios de evaluacion</p>
          <Textarea
            placeholder="Descripción:"
            name="evaluationCriteria1"
            value={evaluationCriteria1}
            onChange={handleChangeInputLevelOne}
          />
          <h3>Nivel 2</h3>
          <p>Grupo de acciones</p>
          <Textarea
            placeholder="Descripción:"
            name="actions2"
            value={actions2}
            onChange={handleChangeInputLevelTwo}
          />
          <p>Criterios de evaluacion</p>
          <Textarea
            placeholder="Descripción:"
            name="evaluationCriteria2"
            value={evaluationCriteria2}
            onChange={handleChangeInputLevelTwo}
          />
          <h3>Nivel 3</h3>
          <p>Grupo de acciones</p>
          <Textarea
            placeholder="Descripción:"
            name="actions3"
            value={actions3}
            onChange={handleChangeInputLevelThree}
          />
          <p>Criterios de evaluacion</p>
          <Textarea
            placeholder="Descripción:"
            name="evaluationCriteria3"
            value={evaluationCriteria3}
            onChange={handleChangeInputLevelThree}
          />
        </div>
        <div className={styles.container__button}>
          <button className={styles.button_submit_register} type="submit" >
            ENVIAR
          </button>
        </div>
      </form>
      <hr />
      <div className={styles.container__frameOfReference}>
        <h2>Marco de referencias</h2>
        <div className={styles.cardReferences}>
          <p>C1 maquetar una aplicacion</p>
          <div className={styles.container__buttons}>
            <Link className={styles.button__edit} to="#">
              <FiEdit />
            </Link>
            <Link className={styles.button__delete} to="#">
              <MdDeleteForever />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { CompetencesTable } from "../../../components/competencesTable/CompetencesTable";
import apiAgora from "../../../api/index";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./DashboardCohort.module.css";
import { CardCohort } from "../../../components/cards/cohort/CardCohort";


export function DashboardCohort() {
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const params = useParams();
  const cohortID = params.id;
  let navigate = useNavigate();
  const [cohortCompetences, setCohortCompetences] = useState([]);
  const [cohort, setCohort] = useState({});

  const fetchCohortCompetences = async (url, id) => {
    const resCompetencesCohort = await apiAgora.get(
      `/api/agora/get-competences/${url}`,
      {
        headers: { Authorization: id },
      }
    );
    const res = resCompetencesCohort.data
    setCohortCompetences(res);
  };

  const fetchCohort = async (url, id) => {
    const res = await apiAgora.get(`/api/agora/get-cohort/${url}`, {
      headers: { Authorization: id },
    });
    setCohort(res.data);
  };

  
  useEffect(() => {
    fetchCohortCompetences(cohortID, userID);
    fetchCohort(cohortID, userID);
  }, [cohortID, userID]);
  return (
    <div className={styles.cohort}>
      <button className={styles.button_return} onClick={() => navigate(-1)}>
        <i className="ri-arrow-go-back-line"></i>
      </button>
      <CardCohort info={cohort} key={"HeaderCohort"} principal={false} />

      <Link className={styles.button_edit} to={"/competences/" + cohortID}>
        Editar o Agregar Competencias <i class="ri-edit-box-fill" style={{fontSize: '30px'}}></i>
      </Link>
      <CompetencesTable competencesState={cohortCompetences} admin={true} />
    </div>
  );
}

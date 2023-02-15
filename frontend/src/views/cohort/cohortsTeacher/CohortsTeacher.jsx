import React from "react";
import { CardCohort } from "../../../components/cards/cohort/CardCohort";
import { useSelector, useDispatch } from "react-redux";
import { dispatchMenu } from '../../../redux/actions/menuAction'
import { useState, useEffect } from "react";
import apiAgora from "../../../api/index";

import styles from "./CohortsTeacher.module.css";

export function CohortsTeacher() {
  const dispatch = useDispatch() //Inicializo hooks
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;

  const [cohortsTeacher, setCohortsTeacher] = useState([]);

  const fetchCohortsTeacher = async (id) => {
    const res = await apiAgora.get(
      `/api/agora/get-cohorts-teacher/${id}`,
      {
        headers: { Authorization: id},
      }
    );
    setCohortsTeacher(res.data);
    dispatch(dispatchMenu())
  };
  useEffect(() => {
    fetchCohortsTeacher(id_user);
    // eslint-disable-next-line
  }, [id_user]);
  return (
    <div className={styles.cohorts}>
      <div className={styles.wrapper}>
        <h2 className={styles.typing_demo}>Cohortes Asignadas</h2>
      </div>
      <div>
        {cohortsTeacher.map((cohort, index) => (
          <CardCohort
            info={cohort}
            key={index}
            principal={false}
            teacher={true}
          />
        ))}
      </div>
    </div>
  );
}

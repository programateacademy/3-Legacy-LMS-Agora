import React from "react";
import { CardCohort } from "../../../components/cards/cohort/CardCohort";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import apiAgora from "../../../api/index";
import { Button } from "../../../components/buttons/Button/Button";
import {useNavigate} from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

import styles from "./CohortsAdmin.module.css";
export function AllCohorts() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [cohortsBootcamp, setCohortsBootcamp] = useState([]);

  let navigate = useNavigate()

  const fetchCohortsBootcamp = async ( id) => {
    const res = await apiAgora.get(`/api/agora/get-all-cohorts/`, {
      headers: { Authorization: id },
    });
    setCohortsBootcamp(res.data);
  };
  useEffect(() => {
    fetchCohortsBootcamp(id_user);
  }, [id_user]);

  return (
    <div className={styles.cohorts}>
      <button className={styles.button_return} onClick={()=>navigate(-1)}>
        <BsArrowLeftCircle size={30}/>
      </button>
      <h2>Registro de Todas las Cohortes</h2>
      <div>
        {cohortsBootcamp.map((cohort, index) => (
          <CardCohort info={cohort} key={index} principal={true} />
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button title="Administrar Información" link="/all-students/" />
      </div>
    </div>
  );
}

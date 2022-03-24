import React from "react";
import { CardCohort } from "../../components/cards/cohort/CardCohort";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import apiAgora from "../../api";
import { Button } from "../../components/buttons/Button/Button";

import styles from "./CohortsAdmin.module.css";
export function CohortsAdmin() {
  const params = useParams();
  const bootcampID = params.id;
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [cohortsBootcamp, setCohortsBootcamp] = useState([]);
  const [nameBootcamp, setNameBootcamp] = useState("");

  const fetchBootcampName = async () => {
    const resName = await apiAgora.get(
      `/api/agora//get-bootcamps/${bootcampID}`,
      {
        headers: { Authorization: id_user },
      }
    );
    setNameBootcamp(resName.data.nameBootcamp);
  };

  const fetchCohortsBootcamp = async () => {
    const res = await apiAgora.get(`/api/agora/get-cohorts/${bootcampID}`, {
      headers: { Authorization: id_user },
    });
    setCohortsBootcamp(res.data);
  };
  useEffect(() => {
    fetchCohortsBootcamp();
    fetchBootcampName();
  }, []);

  return (
    <div className={styles.cohorts}>
      <h2>{`Cohortes bootcamp ${nameBootcamp}`}</h2>
      <div className={styles.buttonContainer}>
        <Button title="Crear cohorte" link="/" />
      </div>
      <div>
        {cohortsBootcamp.map((cohort, index) => (
          <CardCohort info={cohort} key={index} />
        ))}
      </div>
    </div>
  );
}

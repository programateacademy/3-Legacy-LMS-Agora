import React, { useState, useEffect } from "react";
import { CardCohort } from "../../../components/cards/cohort/CardCohort";
import { useSelector } from "react-redux";
import apiAgora from "../../../api";
import { Button } from "../../../components/Buttons/Button";
import { useNavigate, useParams } from "react-router-dom";


import styles from "./CohortsAdmin.module.css";
export function CohortsAdmin() {
  const params = useParams();
  const bootcampID = params.id;
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [cohortsBootcamp, setCohortsBootcamp] = useState([]);
  const [nameBootcamp, setNameBootcamp] = useState("");

  let navigate = useNavigate()

  const fetchBootcampName = async (url, id) => {
    const resName = await apiAgora.get(
      `/api/agora/get-bootcamps/${url}`,
      {
        headers: { Authorization: id },
      }
    );
    setNameBootcamp(resName.data.nameBootcamp);
  };

  const fetchCohortsBootcamp = async (url, id) => {
    const res = await apiAgora.get(`/api/agora/get-cohorts/${url}`, {
      headers: { Authorization: id },
    });
    setCohortsBootcamp(res.data);
  };
  useEffect(() => {
    fetchCohortsBootcamp(bootcampID, id_user);
    fetchBootcampName(bootcampID, id_user);
  }, [bootcampID, id_user]);

  return (
    <div className={styles.cohorts}>
      <button className={styles.button_return} onClick={() => navigate(-1)}>
        <i className="ri-arrow-go-back-line"></i>
      </button>
      <h2>{`Cohortes bootcamp ${nameBootcamp}`}</h2>
      <div className={styles.buttonContainer}>
        <Button
          title="Crear cohorte"
          link={`/bootcamp/cohorts/create-cohort/${bootcampID}`}
        />
      </div>
      <div>
        {cohortsBootcamp.map((cohort, index) => (
          <CardCohort info={cohort} key={index} principal={true} />
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { CardActivity } from "../../../components/cards/activity/CardActivity";
import { useSelector } from "react-redux";
import apiAgora from "../../../api";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/Buttons/Button";
import styles from "./Queries.module.css";

export function Queries(props) {
  const { teacher } = props;
  const params = useParams();
  /* if (teacher) {return cohortID = params.id} else {return cohortID= auth.user.cohortID} */
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const [cohortQueries, setCohortQueries] = useState([]);
  const cohortID = teacher ? params.id : auth.user.cohortID;

  const fetchCohortQueries = async (url, id) => {
    const res = await apiAgora.get(`/api/agora/get-queries/${url}`, {
      headers: { Authorization: id },
    });
    setCohortQueries(res.data);
  };
  useEffect(() => {
    fetchCohortQueries(cohortID, userID);
  }, [cohortID, userID]);
  return (
    <div className={styles.container}>

      <h2 className={styles.titleQueries}>Consultas</h2>

      {teacher ? (
        <div className={styles.buttonCreateQuery}>
          <Button
            title="Crear consulta"
            link={`/query/create-query/${cohortID}`}
          />
        </div>
      ) : null}

      <div className={styles.queries}>
        {cohortQueries.length !== 0
          ? cohortQueries.map((activity, index) => (
              <div key={index}>
                <CardActivity
                  cohortID={cohortID}
                  id={activity.id}
                  type="query"
                  title={activity.titleQuery}
                  description={activity.descriptionQuery}
                  image={activity.pictureQuery}
                  teacher={teacher}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

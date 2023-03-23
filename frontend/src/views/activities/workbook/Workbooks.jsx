import React, { useState, useEffect } from "react";
import { CardActivity } from "../../../components/cards/activity/CardActivity";
import { useSelector } from "react-redux";
import apiAgora from "../../../api";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/Buttons/Button";
import styles from "./Workbooks.module.css";

export function Workbooks(props) {
  const { teacher } = props;
  const params = useParams();
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const [cohortWorkbooks, setCohortWorkbooks] = useState([]);
  const cohortID = teacher ? params.id : auth.user.cohortID;

  const fetchCohortWorkbooks = async (url, id) => {
    const res = await apiAgora.get(`/api/agora/get-workbooks/${url}`, {
      headers: { Authorization: id },
    });
    setCohortWorkbooks(res.data);
  };
  useEffect(() => {
    fetchCohortWorkbooks(cohortID, userID);
  }, [cohortID, userID]);
  return (
    <div className={styles.container}>

      <h2 className={styles.titleBigworkbooks}>Workbooks</h2>

      {teacher ? (
        <div className={styles.buttonCreateWorkbook}>
          <Button
            title="Crear workbook"
            link={`/workbook/create-workbook/${cohortID}`}
          />
        </div>
      ) : null}

      <div className={styles.workbooks}>
        {cohortWorkbooks.length !== 0
          ? cohortWorkbooks.map((activity, index) => (
              <div key={index}>
                <CardActivity
                  cohortID={cohortID}
                  id={activity.id}
                  type="workbook"
                  title={activity.titleWorkbook}
                  description={activity.descriptionWorkbook}
                  image={activity.pictureWorkbook}
                  teacher={teacher}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

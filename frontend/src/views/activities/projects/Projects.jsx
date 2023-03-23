import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardActivity } from "../../../components/cards/activity/CardActivity";
import { useSelector } from "react-redux";
import apiAgora from "../../../api";
import { Button } from "../../../components/Buttons/Button";
import styles from "./Projects.module.css";

export function Projects(props) {
  const { teacher } = props;
  const params = useParams();
  const auth = useSelector((state) => state.auth);
  // Variables solamente para realizar las pruebas unitarias en local
  // const userID = "63e3e46a39cb1aea19895659";
  // const cohortID = teacher
  //  ? "63e3e39d39cb1aea19895658"
  //  : "63e40c5c714d65226eef6c0a";
  const userID = auth.user.id;
  const cohortID = teacher ? params.id : auth.user.cohortID;
  const [cohortProjects, setCohortProjects] = useState([]);

  const fetchCohortsProjects = async (url, id) => {
    const res = await apiAgora.get(`/api/agora/get-projects/${url}`, {
      headers: { Authorization: id },
    });
    setCohortProjects(res.data);
  };
  useEffect(() => {
    fetchCohortsProjects(cohortID, userID);
  }, [cohortID, userID]);
  return (
    <div className={styles.projects}>
      <h2 className={styles.titleBigproject}>Proyectos</h2>
      {teacher ? (
        <div className={styles.buttonCreateProject}>
          <Button
            title="Crear proyecto"
            link={`/project/create-project/${cohortID}`}
          />
        </div>
      ) : null}
      <div className={styles.cards}>
        {cohortProjects.length !== 0
          ? cohortProjects.map((activity, index) => (
              <div key={index}>
                <CardActivity
                  cohortID={cohortID}
                  id={activity.id}
                  type="project"
                  title={activity.titleProject}
                  description={activity.descriptionProject}
                  image={activity.pictureProject}
                  teacher={teacher}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

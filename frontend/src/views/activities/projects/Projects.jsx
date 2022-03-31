import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardActivity } from "../../../components/cards/activity/CardActivity";
import { useSelector } from "react-redux";
import apiAgora from "../../../api/index"
import {Button} from "../../../components/buttons/Button/Button"
import styles from "./Projects.module.css"

export function Projects(props) {
  const {teacher}= props
  const params = useParams()
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const [cohortProjects, setCohortProjects] = useState([])
  const cohortID = teacher ? params.id : auth.user.cohortID

  const fetchCohortsProjects = async (url, id) => {
    const res = await apiAgora.get(`/api/agora/get-projects/${url}`, {
      headers: { Authorization: id},
    });
    setCohortProjects(res.data);
  };
  useEffect(() => {
    fetchCohortsProjects(cohortID,userID )
  }, [cohortID, userID]);
  return (
    <div className={styles.projects}>
      <h2>Proyectos</h2>
      { teacher ? <div className={styles.buttonCreateProject}>
        <Button title="Crear proyecto" link={`/project/create-project/${cohortID}`}/>
      </div> : null }
      <div className={styles.cards}>
      {cohortProjects.length !== 0 ? cohortProjects.map((activity, index) => (
        <div key={index}><CardActivity id={activity.id} type="project" title={activity.titleProject} description={activity.descriptionProject} image={activity.pictureProject} teacher={teacher} /></div>
        )) : null}
        </div>

    </div>

  );
}

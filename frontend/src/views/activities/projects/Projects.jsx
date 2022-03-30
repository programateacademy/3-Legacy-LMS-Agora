import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardActivity } from "../../../components/cards/activity/CardActivity";
import { useSelector } from "react-redux";
import apiAgora from "../../../api/index"
import {Button} from "../../../components/buttons/Button/Button"

export function Projects(props) {
  const {teacher}= props
  const params = useParams()
  const cohortID = params.id
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const [cohortProjects, setCohortProjects] = useState([])

  const fetchCohortsProjects = async () => {
    const res = await apiAgora.get(`/api/agora/get-projects/${cohortID}`, {
      headers: { Authorization: userID },
    });
    setCohortProjects(res.data);
  };
  useEffect(() => {
    fetchCohortsProjects()
  }, []);
  return (
    <div>
      <h2>Proyectos</h2>
      <div>
        <Button title="Crear proyecto" link={`/project/create-project/${cohortID}`}/>
      </div>
      {cohortProjects.length != 0 ? cohortProjects.map((activity, index) => (
        <div key={index}><CardActivity id={activity.id} type="project" title={activity.titleProject} description={activity.descriptionProject} image={activity.pictureProject} teacher={teacher} /></div>
      )) : null}

    </div>

  );
}

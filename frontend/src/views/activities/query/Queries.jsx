import React from "react";
import { CardActivity } from "../../../components/cards/activity/CardActivity";
import {useState, useEffect} from "react"
import { useSelector } from "react-redux";
import apiAgora from "../../../api"
import {useParams} from "react-router-dom"
import {Button} from "../../../components/buttons/Button/Button"

export function Queries(props) {
  const {teacher}= props
    const params = useParams()
  const cohortID = params.id
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const [cohortQueries, setCohortQueries] = useState([])


  const fetchCohortQueries = async (url, id) => {
      const res = await apiAgora.get(`/api/agora/get-queries/${url}`, {
        headers: { Authorization:  id},
      });
      setCohortQueries(res.data);
    };
    useEffect(() => {
      fetchCohortQueries(cohortID,userID)
    }, [cohortID,userID]);
  return (
    <div>
      <h2>Consultas</h2>
      <div>
        <Button title="Crear consulta" link={`/query/create-query/${cohortID}`}/>
      </div>
      {cohortQueries.length !==0 ? cohortQueries.map((activity, index) => (
        <div key={index}><CardActivity id={activity.id} type="query" title={activity.titleQuery} description={activity.descriptionQuery} image={activity.pictureQuery} teacher={teacher} /></div>
      )) : null}

    </div>

  );
}
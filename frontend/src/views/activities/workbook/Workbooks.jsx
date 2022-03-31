import React from "react";
import { CardActivity } from "../../../components/cards/activity/CardActivity";
import {useState, useEffect} from "react"
import { useSelector } from "react-redux";
import apiAgora from "../../../api"
import {useParams} from "react-router-dom"
import {Button} from "../../../components/buttons/Button/Button"

export function Workbooks(props) {
  const {teacher}= props
    const params = useParams()
  const cohortID = params.id
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const [cohortWorkBooks, setCohortWorkBooks] = useState([])


  const fetchCohortWorkBooks = async () => {
      const res = await apiAgora.get(`/api/agora/get-workbooks/${cohortID}`, {
        headers: { Authorization: userID },
      });
      setCohortWorkBooks(res.data);
    };
    useEffect(() => {
      fetchCohortWorkBooks()
    }, []);
  return (
    <div>
      <h2>Workbooks</h2>
      <div>
        <Button title="Crear workbook" link={`/workbook/create-workbook/${cohortID}`}/>
      </div>
      {cohortWorkBooks.length !==0 ? cohortWorkBooks.map((activity, index) => (
        <div key={index}><CardActivity id={activity.id} type="workbook" title={activity.titleWorkBook} description={activity.descriptionWorkBook} image={activity.pictureWorkBook} teacher={teacher} /></div>
      )) : null}

    </div>

  );
}
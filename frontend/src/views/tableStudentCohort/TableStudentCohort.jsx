import React from "react";
import styles from "./TableTeacher.module.css"
import { Table } from '../../components/table/Table'
import { useState } from "react";
import { useEffect } from "react";
import apiAgora from '../../api'
import { Button } from "../../components/buttons/Button/Button";
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

export function TableStudentCohort() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const params = useParams();
  const cohortID = params.id;
  const [students, setStudents] = useState([])
  const [nameCohort,  setNameCohort] = useState("");

  let navigate = useNavigate()

  const fetchStudents = async () => {
    const res = await apiAgora.get(`api/all_students/${cohortID}`, {
      headers: { Authorization: id_user }
    })
    setStudents(res.data)
  }

  const fetchCohortName = async () => {
    const resName = await apiAgora.get(
      `/api/agora/get-cohort/${cohortID}`,
      {
        headers: { Authorization: id_user },
      }
    );
    setNameCohort(resName.data.nameCohort);
  };

  useEffect(() => {
    fetchCohortName();
    fetchStudents();
  }, [])
  return (
    <div className={styles.container}>
      <button className={styles.button_return} onClick={()=>navigate(-1)}>
        <BsArrowLeftCircle size={30}/>
      </button>
       <h1>{`Listado de Estudiantes - Cohorte ${nameCohort}`}</h1>
       <div className={styles.tableContainer}>
       <Table tableList={students} adminID={id_user}/>
       </div>
        <div className={styles.buttonContainer}>
        <Button title="Crear Estudiante" link={"/cohort/register_student/"+cohortID} />
          </div>
    </div>
  );
}

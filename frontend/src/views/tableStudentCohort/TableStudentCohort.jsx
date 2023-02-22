import React, { useState, useEffect } from "react";
import styles from "./TableTeacher.module.css"
import { Table } from '../../components/table/Table'
import apiAgora from '../../api/index'
import { Button } from "../../components/Buttons/Button";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

export function TableStudentCohort() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const params = useParams();
  const cohortID = params.id;
  const [students, setStudents] = useState([])
  const [nameCohort,  setNameCohort] = useState("");

  let navigate = useNavigate()

  const fetchStudents = async (url, id) => {
    const res = await apiAgora.get(`api/all_students/${url}`, {
      headers: { Authorization: id }
    })
    setStudents(res.data)
  }

  const fetchCohortName = async (url, id) => {
    const resName = await apiAgora.get(
      `/api/agora/get-cohort/${url}`,
      {
        headers: { Authorization: id },
      }
    );
    setNameCohort(resName.data.nameCohort);
  };

  useEffect(() => {
    fetchCohortName(cohortID, id_user);
    fetchStudents(cohortID, id_user);
  }, [cohortID, id_user])
  return (
    <div className={styles.container}>
      <button className={styles.button_return} onClick={()=>navigate(-1)}>
        <BsArrowLeftCircle size={30}/>
      </button>
       <h1>{`Listado de Estudiantes - Cohorte ${nameCohort}`}</h1>
       <div className={styles.tableContainer}>
       <Table tableList={students} adminID={id_user} fetchUser={()=>fetchStudents(cohortID, id_user)}/>
       </div>
        <div className={styles.buttonContainer}>
        <Button title="Crear Estudiante" link={"/cohort/register_student/"+cohortID} />
          </div>
    </div>
  );
}

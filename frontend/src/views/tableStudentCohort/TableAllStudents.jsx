import React from "react";
import styles from "./TableTeacher.module.css"
import { Table } from '../../components/table/Table'
import { useState } from "react";
import { useEffect } from "react";
import apiAgora from '../../api/index'
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

export function TableAllStudents() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [students, setStudents] = useState([])

  let navigate = useNavigate()

  const fetchStudents = async ( id) => {
    const res = await apiAgora.get(`api/all_students_register/`, {
      headers: { Authorization: id }
    })
    setStudents(res.data)
  }

   useEffect(() => {
    fetchStudents(id_user);
  }, [id_user])
  return (
    <div className={styles.container}>
      <button className={styles.button_return} onClick={()=>navigate(-1)}>
        <BsArrowLeftCircle size={30}/>
      </button>
       <h1>Todos Los Estudiantes Registrados</h1>
       <div className={styles.tableContainer}>
       <Table tableList={students} adminID={id_user} fetchUser={()=>fetchStudents(id_user)}/>
       </div>
    </div>
  );
}

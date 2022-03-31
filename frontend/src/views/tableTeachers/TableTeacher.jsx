import React from "react";
import styles from "./TableTeacher.module.css"
import { Table } from '../../components/table/Table'
import { useState } from "react";
import { useEffect } from "react";
import apiAgora from '../../api'
import { Button } from "../../components/buttons/Button/Button";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

export function TableTeacher() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [teachers, setTeachers] = useState([])

  let navigate = useNavigate()

  const fetchTeachers = async (id) => {
    const res = await apiAgora.get("api/all_teacher", {
      headers: { Authorization: id }
    })
    setTeachers(res.data)
  }
  useEffect(() => {
    fetchTeachers(id_user)
  }, [id_user])
  return (
    <div className={styles.container}>
      <button className={styles.button_return} onClick={()=>navigate(-1)}>
        <BsArrowLeftCircle size={30}/>
      </button>
        <h1>Listado de formadores</h1>
       <div className={styles.tableContainer}>
       <Table tableList={teachers} adminID={id_user} fetchUser={()=>fetchTeachers(id_user)}/>
       </div>
        <div className={styles.buttonContainer}>
        <Button title="Crear formador" link="/register_teacher" />
          </div>
    </div>
  );
}

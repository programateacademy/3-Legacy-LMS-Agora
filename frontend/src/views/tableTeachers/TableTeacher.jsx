import React from "react";
import styles from "./TableTeacher.module.css"
import { Table } from '../../components/table/Table'
import { useState } from "react";
import { useEffect } from "react";
import apiAgora from '../../api'
import { Button } from "../../components/buttons/Button/Button";
import { useSelector } from "react-redux";

export function TableTeacher() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [teachers, setTeachers] = useState([])

  const fetchTeachers = async () => {
    const res = await apiAgora.get("api/all_teacher", {
      headers: { Authorization: id_user }
    })
    setTeachers(res.data)
  }
  useEffect(() => {
    fetchTeachers()
  }, [])
  return (
    <div className={styles.container}>
        <h1>Listado de formadores</h1>
       <div className={styles.tableContainer}>
       <Table tableList={teachers} adminID={id_user}/>
       </div>
        <div className={styles.buttonContainer}>
        <Button title="Crear formador" link="/register_teacher" />
          </div>
    </div>
  );
}

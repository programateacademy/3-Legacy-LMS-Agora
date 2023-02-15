import React from "react";
import styles from "./SuperAdminHome.module.css"
import { Table } from '../../../components/table/Table'
import { useState } from "react";
import { useEffect } from "react";
import apiAgora from '../../../api/index'
import { Button } from "../../../components/buttons/Button/Button";
import { useSelector } from "react-redux";

export function SuperAdminHome() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [admins, setAdmins] = useState([])

  const fetchAdmins = async (id) => {
    const res = await apiAgora.get('/api/all_admin', {
      headers: { Authorization: id }
    })
    setAdmins(res.data)
  }
  useEffect(() => {
    fetchAdmins(id_user)
  }, [id_user])
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        <h2 className={styles.typing_demo}>Administradores</h2>
      </div>
       <div className={styles.tableContainer}>
       <Table tableList={admins} superAdminID={id_user} fetchUser={()=>fetchAdmins(id_user)}/>
       </div>
        <div className={styles.buttonContainer}>
        <Button title="Crear administrador" link="/register_admin" />
          </div>
    </div>
  );
}

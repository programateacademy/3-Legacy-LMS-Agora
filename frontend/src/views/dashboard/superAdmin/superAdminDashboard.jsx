import React from "react";
import styles from "./styles.module.css"
import { Table } from '../../../components/table'
import { useState } from "react";
import { useEffect } from "react";
import apiAgora from '../../../api'
import { Button } from "../../../components/buttons/Button/Button";
import { useSelector } from "react-redux";

export function SuperAdminDashboard() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [admins, setAdmins] = useState([])

  const fetchAdmins = async () => {
    const res = await apiAgora.get('/api/all_admin', {
      headers: { Authorization: id_user }
    })
    setAdmins(res.data)
  }
  useEffect(() => {
    fetchAdmins()
  }, [])
  return (
    <div className={styles.container}>
        <h1>Administradores</h1>
        <Table tableList={admins} />
        <div className={styles.buttonContainer}>
        <Button title="Crear administrador" link="/" />
          </div>
    </div>
  );
}

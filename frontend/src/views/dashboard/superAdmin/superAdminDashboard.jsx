import React from "react";
import styles from "./styles.module.css"
import {Table} from '../../../components/table'

export function SuperAdminDashboard() {
  return (
    <div className={styles.example}>
      <div class="container">
        <h1>Administradores</h1>
        <Table/>
</div>
    </div>
  );
}

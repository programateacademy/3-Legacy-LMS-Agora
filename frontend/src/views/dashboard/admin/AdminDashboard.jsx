import React from "react";
import { Bootcamps } from "../../bootcamps/Bootcamps.jsx";
import styles from "./AdminDashboard.module.css";
import { Button } from "../../../components/buttons/Button/Button.jsx";
export function AdminDashboard() {
  return (
    <div className={styles.adminDashboard}>
      <h2>Bootcamps</h2>
      <div className={styles.buttonsContainer}>
        <Button title="Crear bootcamp" link="/" />
        <Button title="Ver formadores" link="/" />
      </div>
      <div className={styles.bootcampsContainer}>
        <Bootcamps />
      </div>
    </div>
  );
}

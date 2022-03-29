import React from "react";
import { Bootcamps } from "../../bootcamps/Bootcamps.jsx";
import styles from "./AdminHome.module.css";
import { Button } from "../../../components/buttons/Button/Button.jsx";
export function AdminHome() {
  return (
    <div className={styles.adminDashboard}>
      <div class={styles.wrapper}>
        <h2 class={styles.typing_demo}>Bootcamps</h2>
      </div>
      <div className={styles.buttonsContainer}>
        <Button title="Crear bootcamp" link="/bootcamp/create-bootcamp" />
        <Button title="Ver formadores" link="/list_teachers" />
      </div>
      <div className={styles.bootcampsContainer}>
        <Bootcamps />
      </div>
    </div>
  );
}

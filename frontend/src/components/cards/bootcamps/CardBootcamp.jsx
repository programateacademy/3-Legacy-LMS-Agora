import React from "react";
import styles from "./CardBootcamp.module.css";
import { Button } from "../../buttons/Button/Button";
export function CardBootcamp(props) {
  const { name, image, description, linkCohort, linkUpdate } = props;
  return (
      <div className={styles.card}>
        <div className={styles.image}>
          <img src={image} alt={name} />
        </div>
        <div className={styles.content}>
          <h3>{name}</h3>
          <p>{description}</p>
          <div className={styles.button}>
          <Button title="Ver cohortes" link={linkCohort} />
          </div>
          <div className={styles.button}>
          <Button title="Editar" link={linkUpdate} />
          </div>
        </div>
        <div className={styles.circleDecor}></div>
        <div className={styles.circleDecor2}></div>
      </div>
  );
}

import React from "react";
import styles from "./CardBootcamp.module.css";
import { Button } from "../../Buttons/Button";
import LazyLoad from "react-lazy-load";

export function CardBootcamp(props) {
  const { name, image, description, linkCohort, linkUpdate } = props;
  return (
    <>
      <div className={styles.card}>
        <LazyLoad className={styles.image}>
          <img src={image} alt={name} />
        </LazyLoad>
        <div className={styles.content}>
          <h3>{name}</h3>
          <p>{description}</p>
          <div className={styles.button}>
            <Button title="Ver cohortes" link={linkCohort} />
          </div>
          <div className={styles.button}>
            <Button title="Editar" link={linkUpdate}/>
          </div>
        </div>
        <div className={styles.circleDecor}></div>
        <div className={styles.circleDecor2}></div>
      </div>
    </>
  );
}

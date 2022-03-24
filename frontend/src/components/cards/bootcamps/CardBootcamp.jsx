import React from "react";
import styles from "./CardBootcamp.module.css";
import { Button } from "../../buttons/Button/Button";
export function CardBootcamp(props) {
  const { name, image, description, linkTo } = props;
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.image}>
          <img src={image} alt={name} />
        </div>
        <div className={styles.content}>
          <h3>{name}</h3>
          <p>{description}</p>
          <Button title="Ver cohortes" link={linkTo} />
        </div>
      </div>
    </div>
  );
}

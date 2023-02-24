/*Importamos las funciones de React, los estilos, la ruta de redirección y el componente boton
Exportamos la funcione con su estructura html para cada proyecto, workbook o consulta que crea 
el formador e info que le llegue de props*/
import React from "react";
import styles from "./CardActivity.module.css";
import { ButtonGradual } from "../../Buttons/Button";
import { Link } from "react-router-dom";

export function CardActivity(props) {
  const { title, image, teacher, id, type, cohortID } = props;
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} alt="Imagen del proyecto" />
      {teacher ? (
        <div className={styles.dots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.list}>
            <li>
              <Link to={`/${type}/update-${type}/${id}`}>Editar</Link>
            </li>
            <li>
              <Link to={`/${cohortID}/${type}/grade/${id}`}>Calificar</Link>
            </li>
          </div>
          <div className={styles.dot}></div>
        </div>
      ) : (
        ""
      )}

      <div className={styles.card__overlay}>
        <div className={styles.card__header}>
          <div className={styles.card__header__text}>
            <h3 className={styles.card__title}>{title}</h3>
          </div>
        </div>
        <h5 className={styles.card__description}>{title}</h5>
        <div className={styles.buttonVerMasContainer}>
          <ButtonGradual link={`/${type}/view-${type}/${id}`} />
        </div>
      </div>
    </div>
  );
}

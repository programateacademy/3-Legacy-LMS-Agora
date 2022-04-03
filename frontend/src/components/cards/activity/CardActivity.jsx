import React from "react";
import styles from "./CardActivity.module.css";
import { ButtonGradual } from "../../buttons/Button/ButtonGradual";
import { Link } from "react-router-dom";

export function CardActivity(props) {
  const { title, image, teacher, id, type, cohortID } = props;
  return (
    <div className={styles.card} style={{ backgroundImage: `url(${image})` }}>
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
            <h3 className={styles.card__title}>Ver más</h3>
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

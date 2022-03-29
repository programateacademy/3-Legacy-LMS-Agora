import React from "react";
import styles from './styles.module.css';
import { ButtonGradual } from "../../buttons/Button/ButtonGradual";

export function CardProject() {
  return (
        
        <div className={styles.card}>
          <div className={styles.dots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.list}>
              <li>
                Editar
              </li>
              <li>
                Calificar
              </li>
            </div>
            <div className={styles.dot}></div>
          </div>
          <div className={styles.card__overlay}>
            <div className={styles.card__header}>
              <path />
              <div className={styles.card__header__text}>
                <h3 className={styles.card__title}>PROJECT</h3>
              </div>
            </div>
            <p className={styles.card__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
            <div className={styles.buttonVerMasContainer}>
             <ButtonGradual link="/" />
              </div>
          </div>
        </div>
  );
}
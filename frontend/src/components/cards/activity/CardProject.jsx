import React from "react";
import styles from './styles.module.css';
import { Button } from "../../buttons/Button/Button";

export function CardProject() {
  return (
      <div className={styles.cards}>
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
          <img src="https://i.imgur.com/oYiTqum.jpg" className={styles.card__image} alt="" />
          <div className={styles.card__overlay}>
            <div className={styles.card__header}>
              <path />
              <div className={styles.card__header__text}>
                <h1 className={styles.card__title}>PROJECT</h1>
              </div>
            </div>
            <p className={styles.card__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
            <div className={styles.buttonVerMasContainer}>
             <Button title="Ver proyecto" link="/" />
              </div>
          </div>
        </div>
        </div>
  );
}
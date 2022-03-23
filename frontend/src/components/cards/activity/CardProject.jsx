import React from "react";
import styles from './styles.module.css';

export function CardProject() {
  return (
    <div className={styles.projectCard}>
      <ul className={styles.cards}>
  <li>
    <a href="" className={styles.card}>
      <div className={styles.card__overlay}>
        <div className={styles.card__header}>
          <svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <div className={styles.card__header_text}>
			  <h2>Project</h2>
            <span className={styles.card__status}>1 hour ago</span>
          </div>
        </div>
        <p className={styles.card__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
	  </div>
    </a>
  </li> 
</ul>
    </div>
  );
}
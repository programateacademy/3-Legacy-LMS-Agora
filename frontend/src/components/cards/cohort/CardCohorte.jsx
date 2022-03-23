import React from "react";
import styles from "./CardCohorte.module.css"
{/*
// SOCIAL PANEL JS
const floatingBtn = document.querySelector('.floatingBtn');
const closeBtn = document.querySelector('.closeBtn');
const socialPanelContainer = document.querySelector('.socialPanelContainer');

floatingBtn.addEventListener('click', () => {
	socialPanelContainer.classList.toggle('visible')
});

closeBtn.addEventListener('click', () => {
	socialPanelContainer.classList.remove('visible')
});
*/}
export function CardCohorte () {
  return (
    <div>
      <div className={styles.coursesContainer}>
	<div className={styles.course}>
		<div className={styles.coursePreview}>
			<img src="http://drive.google.com/uc?export=view&id=17ET4W7WNQbfpSVtGjFjzzQL_CbFNbsUc" alt="" />
		</div>
		<div className={styles.courseInfo}>
			<h2>Nombre de  la cohorte</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu lacus pulvinar, fermentum tellus quis, viverra mi. Duis massa sapien, sagittis ac lacinia nec, varius non enim.</p>
			<p>Fechas</p>
			<button className={styles.btn}>Continue</button>
		</div>
	</div>
</div>

</div>
  );
}
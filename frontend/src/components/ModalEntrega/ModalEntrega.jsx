import React from 'react'
import styles from "./ModalEntrega.module.css";

export function ModalEntrega() {
  return (

    <div className={styles.containerModal}>
    <div className={styles.cajaTitle}>
        <div className={styles.title}>
                <h2>Nombre de la entrega</h2>
        </div>
        <div className={styles.icon}>
            <p>icono</p>
        </div>
    </div>

    <div className={styles.cajaDiv}>

        <div className={styles.subTitle}>
            <h6>nombre del estudiante</h6>
        </div>

        <div className={styles.cajaMedia}>
            <div className={styles.primerFondo}>
                <div className={styles.segundoFondo}>
                    <p>descripcion</p>
                </div>
                <div className={styles.inputDes}>
                    <textarea name="mensaje" ></textarea>
                    <button>enviar</button>
                </div>
            </div>

            <div className={styles.cajaUltima}>
                <div className={styles.calif}>
                    <p>
                        C7. Desarrollar la parte back-end de una aplicacion web o movil
                    </p>
                    <div className={styles.icons}>
                        <div>jsdh</div>
                        <h4>iconos</h4>
                    </div>
                </div>
                <div className={styles.calif}>
                    <p>
                        C7. Desarrollar la parte back-end de una aplicacion web o movil
                    </p>
                    <div className={styles.icons}>
                        <div>jsdh</div>
                        <h4>iconos</h4>
                    </div>
                </div>
                <div className={styles.boton}>
                    <button>evaluar</button>
                </div>
            </div>
        </div>

    </div>
</div>

  );
}


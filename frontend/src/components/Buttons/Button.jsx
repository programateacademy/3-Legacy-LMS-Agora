//Importamos las funciones de React, los estilos y la ruta de redirección
//Exportamos las funciones individualmente para su uso correcto en los componentes requeridos

import React from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

// Button general
export function Button(props) {
  const { title, link } = props;
  return (
    <Link className={styles.yellowButton} to={link}>
      {title}
    </Link>
  );
}

// Button detalles de los cards
export function ButtonGradual(props) {
  const { link } = props;
  return (
    <Link className={styles.btn} to={link}>
      Detalles !
    </Link>
  );
}

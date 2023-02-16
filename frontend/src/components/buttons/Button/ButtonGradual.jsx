import React from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

export function ButtonGradual(props) {
  const { link } = props;
  return (
    <div className={styles.btn}>
      <Link to={link}>Detalles !</Link>
    </div>    

  );
}

import React from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

export function ButtonGradual(props) {
  const { link } = props;
  return (
      <Link className={styles.btn} to={link}>
        Detalles !
      </Link>
  );
}

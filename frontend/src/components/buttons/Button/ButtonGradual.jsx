import React from "react";
import styles from "./styles.module.css"
import { Link } from "react-router-dom";

export function ButtonGradual (props) {
    const {link}=props
    return (
        <div className={styles.buttongradual}>
            <Link to={link}>Detalles</Link>
            </div>
    )
}
import React from "react";
import styles from './styles.module.css';
import { Link } from "react-router-dom";

export function FormButton(props) {
    const {title, link} = props
    return (
<Link className={styles.createUser} to={link} >{title}</Link>
    );
}
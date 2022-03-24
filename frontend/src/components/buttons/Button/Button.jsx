import React from "react";
import styles from './styles.module.css';
import { Link } from "react-router-dom";

export function Button (props) {
    const {title, link} = props
    return (
<Link className={styles.yellowButton} to={link} >{title}</Link>
    );
}
import React from "react";
import styles from "./ProfileStudent.module.css";
import { BsArrowLeftCircle } from "react-icons/bs";
import {AiFillLinkedin} from "react-icons/ai"
import {AiFillGithub} from "react-icons/ai"
import {FaNewspaper} from "react-icons/fa"
import {useNavigate} from "react-router-dom"

export function ProfileStudent(){
    let navigate =useNavigate();
    return(
        <div className={styles.container}>
            <div className={styles.containerProfile}>
                    <button className={styles.button_return} onClick={() => navigate(-1)}>
                        <BsArrowLeftCircle size={30} />
                    </button>
                <div className={styles.cajaIns}>
                    <img src="" alt="logo" />
                    <button>insertar imagen</button>
                </div>
                <div className={styles.cajaName}>
                    <h2>Nombre del estudiante</h2>
                </div>
                <div className={styles.cajaLink}>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Linkedin" />
                        <AiFillLinkedin size={30} color="white"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Github"/>
                        <AiFillGithub size={30} color="white"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Portafolio"/>
                        <FaNewspaper size={30} color="white"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <button>boton</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
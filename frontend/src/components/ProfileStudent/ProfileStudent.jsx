import React from "react";
import styles from "./ProfileStudent.module.css";
import { BsArrowLeftCircle } from "react-icons/bs";
import {AiFillLinkedin} from "react-icons/ai"
import {AiFillGithub} from "react-icons/ai"
import {FaNewspaper} from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import {TableStudent} from "./TableStudent"
import { CompetencesTable } from "../competencesTable/CompetencesTable";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import apiAgora from "../../api"

export function ProfileStudent(){
        const auth = useSelector((state) => state.auth);
        const userID = auth.user.id;
        const cohortID = auth.user.cohortID;
        let navigate = useNavigate();
        const [cohortCompetences, setCohortCompetences] = useState([]);
      
        const fetchCohortCompetences = async (url, id) => {
          const resCompetencesCohort = await apiAgora.get(
            `/api/agora/get-competences/${url}`,
            {
              headers: { Authorization: id },
            }
          );
          const res = resCompetencesCohort.data
          setCohortCompetences(res);
        };
          
        useEffect(() => {
          fetchCohortCompetences(cohortID, userID);
        }, [cohortID, userID]);
    return(
        <div className={styles.container}>
            <div className={styles.containerProfile}>
                    <button className={styles.button_return} onClick={() => navigate(-1)}>
                        <BsArrowLeftCircle size={30} />
                    </button>
                <div className={styles.cajaIns}>
                    <img src="" alt="logo" />
                    <div className={styles.cajaUlt}>
                        <input
                            className={styles.input__imageURL}
                            placeholder="Inserta URL de la imagen de la Consulta"
                            type="text"
                            name="pictureQuery"
                        />
                    </div>
                </div>
                <div className={styles.cajaName}>
                    <h2>Nombre del estudiante</h2>
                </div>
                <div className={styles.cajaLink}>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Linkedin" />
                        <AiFillLinkedin size={30} color="#FEFEFE"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Github"/>
                        <AiFillGithub size={30} color="#FEFEFE"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Portafolio"/>
                        <FaNewspaper size={30} color="#FEFEFE"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <button>Confirmar</button>
                    </div>
                </div>
            </div>
            <div className={styles.tableCompetences}>
                
                    <TableStudent/>
                
                    <CompetencesTable competencesState={cohortCompetences} admin={false}/>
                
            </div>
        </div>
    );
}
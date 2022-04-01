import React from "react";
import styles from "./ProfileStudent.module.css";
import { BsArrowLeftCircle } from "react-icons/bs";
import {AiFillLinkedin} from "react-icons/ai"
import {AiFillGithub} from "react-icons/ai"
import {FaNewspaper} from "react-icons/fa"
import {RiCake2Fill} from "react-icons/ri"
import {useNavigate} from "react-router-dom"
import {TableStudent} from "./TableStudent"
import { CompetencesTable } from "../competencesTable/CompetencesTable";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import apiAgora from "../../api"

const initialState = {
    competence:[],
    dateOfBirth:"",
    gitHub:"",
    image:"",
    portafolio:"",
    linkedin:""
}

export function ProfileStudent(){
        const auth = useSelector((state) => state.auth);
        const userID = auth.user.id;
        const cohortID = auth.user.cohortID;
        let navigate = useNavigate();
        const [cohortCompetences, setCohortCompetences] = useState([]);
        const [user, setUser] = useState([]);
        const [userProfile, setUserProfile] = useState(initialState);

        const {
            competence,
            dateOfBirth,
            gitHub,
            image,
            portafolio,
            linkedin
        } = userProfile;
      
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

        const fetchUser = async (id) =>{
            const resUser = await apiAgora.get(
                `/api/get_user/${id}`,
            {
              headers: { Authorization: id },
            }
          );
          const res = resUser.data
          setUser(res);
        };
        
        const fetchUserProfile = async (id) =>{
            const resUserProfile = await apiAgora.get(
                `/api/agora/get-profile/${id}`,
            {
              headers: { Authorization: id },
            }
          );
          
          const res = resUserProfile.data
          res.dateOfBirth = new Date(res.dateOfBirth).toLocaleDateString("en-CA")
          setUserProfile(res);
        };
        const handleChangeInput = (e) => { const { name, value } = e.target; setUserProfile({ ...userProfile, [name]: value, err: "", success: "" }); }; 
        
        useEffect(() => {
          fetchCohortCompetences(cohortID, userID);
          fetchUser(userID);
          fetchUserProfile(userID);

        }, [cohortID, userID]);
    return(
        <div className={styles.container}>
            <form className={styles.containerProfile}>
                    <button className={styles.button_return} onClick={() => navigate(-1)}>
                        <BsArrowLeftCircle size={30} />
                    </button>
                <div className={styles.cajaIns}>
                    <img src="" alt="logo" />
                    <div className={styles.cajaUlt}>
                        <input
                            className={styles.input__imageURL}
                            placeholder="Inserta URL de la imagen"
                            type="text"
                            name="image" value={image}
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>
                <div className={styles.cajaName}>
                    <h2>{user.firstName+ " " + user.middleName+ " " + user.lastName + " " + user.secondSurname}</h2>
                </div>
                <div className={styles.cajaLink}>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Linkedin" name="linkedin" value={linkedin} onChange={handleChangeInput} />
                        <AiFillLinkedin size={30} color="#FEFEFE"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Github" name="gitHub" value={gitHub} onChange={handleChangeInput}/>
                        <AiFillGithub size={30} color="#FEFEFE"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Portafolio" name="portafolio" value={portafolio} onChange={handleChangeInput}/>
                        <FaNewspaper size={30} color="#FEFEFE"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={handleChangeInput}/>
                        <RiCake2Fill size={30} color="#FEFEFE"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <button>Confirmar</button>
                    </div>
                </div>
            </form>
            <div className={styles.tableCompetences}>
                
                    <TableStudent/>
                
                    <CompetencesTable competencesState={cohortCompetences} admin={false}/>
                
            </div>
        </div>
    );
}
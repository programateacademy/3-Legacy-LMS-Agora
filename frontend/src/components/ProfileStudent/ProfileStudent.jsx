import React from "react";
import styles from "./ProfileStudent.module.css";
import { BsArrowLeftCircle } from "react-icons/bs";
import {AiFillLinkedin} from "react-icons/ai"
import {AiFillGithub} from "react-icons/ai"
import {FaNewspaper} from "react-icons/fa"
import {RiCake2Fill} from "react-icons/ri"
import {useNavigate} from "react-router-dom"
import {TableStudent} from "./TableStudent"
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import { showErrMsg, showSuccessMsg } from "../../utils/notification";
import {CompetencesTableUser} from "../competencesTable/CompetencesTableUser"
import apiAgora from "../../api"

const initialState = {
    competence:[],
    dateOfBirth:"",
    gitHub:"",
    image:"",
    portafolio:"",
    linkedin:"",
    success:""
}

export function ProfileStudent(){
        const auth = useSelector((state) => state.auth);
        const userID = auth.user.id;
        const cohortID = auth.user.cohortID;
        let navigate = useNavigate();
        const [userProfile, setUserProfile] = useState(initialState);
        const [cohortCompetences, setCohortCompetences] = useState([]);
        const [user, setUser] = useState([]);
        const [image, setImage] = useState();
        const [projects, setProjects] = useState([]);
        const [queries, setQueries] = useState([]);
        const [workbooks, setWorkbooks] = useState([]);
        const {
            dateOfBirth,
            gitHub,
            portafolio,
            success,
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
          const res = resUserProfile.data[0]
          res.dateOfBirth = new Date(res.dateOfBirth).toLocaleDateString("en-CA")+
          "T" +
          new Date(res.dateOfBirth).toLocaleTimeString();
          setUserProfile(res);
          setImage(res.image);
        };

        const fetchDelivery = async (id) => {
          const res = await apiAgora.get(`/api/agora/get-delivery/${id}`, {
            headers: { Authorization: id },
          });
          const deliveriesByStudent = res.data;
          const projectByStudent = deliveriesByStudent.map(item => item.deliveryKind ==="project"?item:null).filter((item) => item !== null);
          setProjects(projectByStudent);
          const queryByStudent = deliveriesByStudent.map(item => item.deliveryKind ==="query"?item:null).filter((item) => item !== null);
          setQueries(queryByStudent)
          const workbookByStudent = deliveriesByStudent.map(item => item.deliveryKind ==="workbook"?item:null).filter((item) => item !== null);
          setWorkbooks(workbookByStudent)
        };

        const handleChangeInput = (e) => { const { name, value } = e.target; setUserProfile({ ...userProfile, [name]: value, err: "", success: "" }); }; 
        const handleImage = (e) => {
            const { name, value } = e.target;
            setUserProfile({
              ...userProfile,
              [name]: value,
              err: "",
              success: "",
            });
            setImage(value);
          };
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
              if (auth.isStudent) {
                const res = await apiAgora.put(
                  "/api/agora/update-profile/" + userID,
                  {
                    dateOfBirth,
                    gitHub,
                    image,
                    portafolio,
                    linkedin
                  },
                  {
                    headers: { Authorization: userID },
                  }
                );
                showSuccessMsg("Actualización Comletada","Se ha actualizado la información de su perfil satisfactoriamente");
                setUserProfile({ ...userProfile, err: "", success: res.data.msg });
              }
            } catch (err) {
              showErrMsg(err.response.data.msg);
              err.response.data.msg &&
                setUserProfile({ ...userProfile, err: err.response.data.msg, success: "" });
            }
          };
        useEffect(() => {
          fetchUserProfile(userID);
          fetchUser(userID);
          fetchCohortCompetences(cohortID, userID);
          fetchDelivery(userID);
        }, [cohortID, userID]);
    return(
        <div className={styles.container}>
            <form className={styles.containerProfile} onSubmit={handleSubmit}>
                    <button className={styles.button_return} type="button" onClick={() => navigate(-1)}>
                        <BsArrowLeftCircle size={30} />
                    </button>
                <div className={styles.cajaIns}>
                    <img src={image} alt="logo" />
                    <div className={styles.cajaUlt}>
                        <input
                            className={styles.input__imageURL}
                            placeholder="Inserta URL de la imagen"
                            type="text"
                            name="image" value={image}
                            onChange={handleImage}
                        />
                    </div>
                </div>
                <div className={styles.cajaName}>
                    <h2>{user.firstName+ " " + user.middleName+ " " + user.lastName + " " + user.secondSurname}</h2>
                </div>
                <div className={styles.cajaLink}>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Linkedin" name="linkedin" value={linkedin} onChange={handleChangeInput} />
                        <a href={linkedin} target="_blank"><AiFillLinkedin size={30} color="#FEFEFE"/></a>
                    </div>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Github" name="gitHub" value={gitHub} onChange={handleChangeInput}/>
                        <a href={gitHub} target="_blank"><AiFillGithub size={30} color="#FEFEFE"/></a>
                    </div>
                    <div className={styles.cajaUlt}>
                        <input type="text" placeholder="Enlace Portafolio" name="portafolio" value={portafolio} onChange={handleChangeInput}/>
                        <a href={portafolio} target="_blank"><FaNewspaper size={30} color="#FEFEFE"/></a>
                    </div>
                    <div className={styles.cajaUlt}>
                        <input type="datetime-local" name="dateOfBirth" value={dateOfBirth} onChange={handleChangeInput}/>
                        <RiCake2Fill size={30} color="#FEFEFE"/>
                    </div>
                    <div className={styles.cajaUlt}>
                        <button type="submit">Confirmar</button>
                    </div>
                </div>
            </form>
           
            <div className={styles.tableCompetences}>
                
                    <TableStudent/>
                    <h3>Revise su Progreso en la Tabla de Competencias</h3>
                    <CompetencesTableUser competencesState={userProfile.competence}/>
                
            </div>
        </div>
    );
}
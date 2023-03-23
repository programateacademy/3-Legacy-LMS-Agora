import React, { useEffect, useState } from "react";
import styles from "./ProfileStudent.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { TableStudent } from "./TableStudent";
import { useSelector } from "react-redux";
import { showErrMsg, showSuccessMsg } from "../../utils/notification";
import { CompetencesTableUser } from "../competencesTable/CompetencesTableUser";
import apiAgora from "../../api";
import LazyLoad from "react-lazy-load";
const initialState = {
  competence: [],
  dateOfBirth: "",
  gitHub: "",
  image: "",
  portafolio: "",
  linkedin: "",
  success: "",
};

export function ProfileStudent(props) {
  const { teacher } = props;
  const params = useParams();
  const auth = useSelector((state) => state.auth);
  const userID = teacher ? params.student : auth.user.id;
  const cohortID = teacher ? params.cohort : auth.user.cohortID;
  let navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(initialState);
  const [user, setUser] = useState([]);
  const [image, setImage] = useState();
  const [projects, setProjects] = useState([]);
  const [queries, setQueries] = useState([]);
  const [workbooks, setWorkbooks] = useState([]);

  const { dateOfBirth, gitHub, portafolio, linkedin } = userProfile;

  const fetchUser = async (id) => {
    const resUser = await apiAgora.get(`/api/get_user/${id}`, {
      headers: { Authorization: id },
    });

    const res = resUser.data;
    setUser(res);
  };

  const fetchUserProfile = async (id) => {
    const resUserProfile = await apiAgora.get(`/api/agora/get-profile/${id}`, {
      headers: { Authorization: id },
    });
    const res = resUserProfile.data[0];
    res.dateOfBirth =
      new Date(res.dateOfBirth).toLocaleDateString("en-CA") +
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
    const projectByStudent = deliveriesByStudent
      .map((item) => (item.deliveryKind === "project" ? item.projectID : null))
      .filter((item) => item !== null);
    const projectsFilter = projectByStudent.filter(
      (el, index) => projectByStudent.indexOf(el) === index
    );
    setProjects(projectsFilter);
    const queryByStudent = deliveriesByStudent
      .map((item) => (item.deliveryKind === "query" ? item.queryID : null))
      .filter((item) => item !== null);
    const queriesFilter = queryByStudent.filter(
      (el, index) => queryByStudent.indexOf(el) === index
    );
    setQueries(queriesFilter);

    const workbookByStudent = deliveriesByStudent
      .map((item) =>
        item.deliveryKind === "workbook" ? item.workbookID : null
      )
      .filter((item) => item !== null);
    const workbookFilter = workbookByStudent.filter(
      (el, index) => workbookByStudent.indexOf(el) === index
    );
    setWorkbooks(workbookFilter);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value, err: "", success: "" });
  };
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
            linkedin,
          },
          {
            headers: { Authorization: userID },
          }
        );
        showSuccessMsg(
          "Actualización Comletada",
          "Se ha actualizado la información de su perfil satisfactoriamente"
        );
        setUserProfile({ ...userProfile, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setUserProfile({
          ...userProfile,
          err: err.response.data.msg,
          success: "",
        });
    }
  };
  useEffect(() => {
    fetchUserProfile(userID);
    fetchUser(userID);
    fetchDelivery(userID);
  }, [cohortID, userID]);

  return (
    <>
      <button
        className={styles.button_return}
        type="button"
        onClick={() => navigate(-1)}
      >
        <i className="ri-arrow-go-back-line"></i>
      </button>

      <div className={styles.container}>
      
        <form className={styles.containerProfile} onSubmit={handleSubmit}>
        <div>
          <img
            className="img_background"
            src="https://source.unsplash.com/1600x900/?nature,photography,technology"
            alt="user-pic"
          />
          </div>
          <div className={styles.cajaIns}>
            <LazyLoad className={styles.backround_profile}>
              <img src={image} alt="img_profile" />
            </LazyLoad>
            <button className={styles.chargeimg}>
              <i className="ri-upload-cloud-2-line"></i>
            </button>

            {!teacher ? (
              <div className={styles.cajaUlt}>
                <input
                  className={styles.input__imageURL}
                  placeholder="Inserta URL de la imagen"
                  type="text"
                  name="image"
                  value={image}
                  onChange={handleImage}
                />
              </div>
            ) : null}
          </div>

          <div className={styles.cajaName}>
            <h2>
              {user.firstName +
                " " +
                user.middleName +
                " " +
                user.lastName +
                " " +
                user.secondSurname}
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          {teacher ? (
            <div className={styles.cajaLink}>
              <div className={styles.cajaUlt}>
                <input
                  type="text"
                  name="linkedin"
                  value={linkedin}
                  onChange={handleChangeInput}
                  disabled
                />
                <a href={linkedin} rel="noreferrer" target="_blank">
                  <i
                    className="ri-linkedin-box-fill"
                    style={{ fontSize: "25px", color: "#FEFEFE" }}
                  ></i>
                </a>
              </div>
              <div className={styles.cajaUlt}>
                <input
                  type="text"
                  name="gitHub"
                  value={gitHub}
                  onChange={handleChangeInput}
                  disabled
                />
                <a href={gitHub} rel="noreferrer" target="_blank">
                  <i
                    class="ri-github-fill"
                    styleName={{ fontSize: "25px", color: "#FEFEFE" }}
                  ></i>
                </a>
              </div>
              <div className={styles.cajaUlt}>
                <a href={portafolio} rel="noreferrer" target="_blank">
                  <i
                    class="ri-window-fill"
                    styleName={{ fontSize: "25px", color: "#FEFEFE" }}
                  ></i>
                </a>
                <input
                  type="text"
                  name="portafolio"
                  value={portafolio}
                  onChange={handleChangeInput}
                  disabled
                />
              </div>
              <div className={styles.cajaUlt}>
                <input
                  type="datetime-local"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  onChange={handleChangeInput}
                  disabled
                />
                <i
                  class="ri-cake-2-fill"
                  styleName={{ fontSize: "25px", color: "#FEFEFE" }}
                ></i>
              </div>
            </div>
          ) : (
            <div className={styles.cajaLink}>
              <div className={styles.cajaUlt_container}>
                <div className={styles.cajaUlt}>
                  <a href={linkedin} rel="noreferrer" target="_blank">
                    <i
                      className={`ri-linkedin-fill ${styles.iconcajaUlt}`}
                      style={{ fontSize: "25px", color: "#585858" }}
                    ></i>
                  </a>
                  <input
                    type="text"
                    placeholder="Enlace Linkedin"
                    name="linkedin"
                    value={linkedin}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <div className={styles.cajaUlt_container}>
                <div className={styles.cajaUlt}>
                  <a href={gitHub} rel="noreferrer" target="_blank">
                    <i
                      className={`ri-github-fill ${styles.iconcajaUlt}`}
                      style={{ fontSize: "25px", color: "#585858" }}
                    ></i>
                  </a>
                  <input
                    type="text"
                    placeholder="Enlace Github"
                    name="gitHub"
                    value={gitHub}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className={styles.cajaUlt_container}>
                <div className={styles.cajaUlt}>
                  <a href={portafolio} rel="noreferrer" target="_blank">
                    <i
                      className={`ri-window-fill ${styles.iconcajaUlt}`}
                      style={{ fontSize: "25px", color: "#585858" }}
                    ></i>
                  </a>
                  <input
                    type="text"
                    placeholder="Enlace Portafolio"
                    name="portafolio"
                    value={portafolio}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <div className={styles.cajaUlt_container}>
                <div className={styles.cajaUlt}>
                  <i
                    className={`ri-cake-2-fill ${styles.iconcajaUlt}`}
                    style={{ fontSize: "25px", color: "#585858" }}
                  ></i>
                  <input
                    type="datetime-local"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className={styles.cajaUlt}>
                <button type="submit">Confirmar</button>
              </div>
            </div>
          )}
        </form>

        <div className={styles.tableCompetences}>
          <TableStudent
            projects={projects}
            queries={queries}
            workbooks={workbooks}
            userID={userID}
          />
          {!teacher ? (
            <h3>Revise su Progreso en la Tabla de Competencias</h3>
          ) : (
            <h3>Progreso en la Tabla de Competencias</h3>
          )}

          <CompetencesTableUser competencesState={userProfile.competence} />
        </div>
      </div>
    </>
  );
}

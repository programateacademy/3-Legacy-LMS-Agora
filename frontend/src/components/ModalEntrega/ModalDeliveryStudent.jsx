import React, { useEffect, useState } from "react";
import styles from "./ModalEntrega.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../api";
import { showErrMsg, showSuccessMsg } from "../../utils/notification";
import LazyLoad from "react-lazy-load";

const initialState = {
  message: "",
  delivery: [],
  success: "",
};

export function ModalDeliveryStudent() {
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const cohortID = auth.user.cohortID;
  const params = useParams();
  const deliveryKind = params.kind;
  const activityID = params.id;
  let navigate = useNavigate();

  const [modal, setModal] = useState([]);
  const [modalStudent, setModalStudent] = useState([]);
  const [activityProject, setActivityProject] = useState("");
  const [image, setImage] = useState("");

  const activity = (deliveryKind) => {
    if (deliveryKind === "project") {
      setDeliveryStudent({
        ...deliveryStudent,
        projectID: activityID,
        err: "",
        success: "",
      });
    }
    if (deliveryKind === "workbook") {
      setDeliveryStudent({
        ...deliveryStudent,
        workbookID: activityID,
        err: "",
        success: "",
      });
    }
    if (deliveryKind === "query") {
      setDeliveryStudent({
        ...deliveryStudent,
        queryID: activityID,
        err: "",
        success: "",
      });
    }
  };

  useEffect(() => {
    activity(deliveryKind);
    // eslint-disable-next-line
  }, [deliveryKind]);

  const fetchFeedbacks = async (activityid, id) => {
    const res = await apiAgora.get(`/api/agora/get-outcome/${id}`, {
      headers: { Authorization: id },
    });
    const feedbacksByStudent = res.data;
    const feedbacksByActivity = feedbacksByStudent.map((item) =>
      item.projectID === activityid
        ? item
        : item.queryID === activityid
        ? item
        : item.workbookID === activityid
        ? item
        : null
    );
    const feedbacks = feedbacksByActivity.filter((item) => item !== null);
    setModalStudent(feedbacks);
  };

  const fetchDelivery = async (activityid, id) => {
    const res = await apiAgora.get(`/api/agora/get-delivery/${id}`, {
      headers: { Authorization: id },
    });
    const deliveriesByStudent = res.data;
    const deliveriesByActivity = deliveriesByStudent.map((item) =>
      item.projectID === activityid
        ? item
        : item.queryID === activityid
        ? item
        : item.workbookID === activityid
        ? item
        : null
    );
    const deliveries = deliveriesByActivity.filter((item) => item !== null);
    setModal(deliveries);
  };

  const fetchActivity = async (activity, url, id) => {
    const res = await apiAgora.get(`/api/agora/get-${activity}/${url}`, {
      headers: { Authorization: id },
    });
    if (deliveryKind === "project") {
      setActivityProject(res.data.titleProject);
      setImage(res.data.pictureProject);
    }
    if (deliveryKind === "workbook") {
      setActivityProject(res.data.titleWorkbook);
      setImage(res.data.pictureWorkbook);
    }
    if (deliveryKind === "query") {
      setActivityProject(res.data.titleQuery);
      setImage(res.data.pictureQuery);
    }
  };

  useEffect(() => {
    fetchDelivery(activityID, userID);
    fetchFeedbacks(activityID, userID);
    fetchActivity(deliveryKind, activityID, userID);
    // eslint-disable-next-line
  }, [activityID, userID]);

  const [deliveryStudent, setDeliveryStudent] = useState(initialState);

  const [objectLink, setObjectLink] = useState({
    nameLink: "",
    link: "",
  });

  const { delivery, message, projectID, workbookID, queryID } = deliveryStudent;

  const { nameLink, link } = objectLink;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDeliveryStudent({
      ...deliveryStudent,
      [name]: value,
      err: "",
      success: "",
    });
  };

  const handleChangeLink = (e) => {
    const { name, value } = e.target;
    setObjectLink({
      ...objectLink,
      [name]: value,
      err: "",
      success: "",
    });
  };

  const onClickObject = (name) => {
    if (objectLink.link.trim() && objectLink.nameLink.trim()) {
      setDeliveryStudent({
        ...deliveryStudent,
        [name]: [...deliveryStudent[name], objectLink],
        err: "",
        success: "",
      });
    }
  };

  const deleteItemArray = (name, item) => {
    setDeliveryStudent({
      ...deliveryStudent,
      [name]: deliveryStudent[name].filter((e) => e !== item),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isStudent) {
        const res = await apiAgora.post(
          "/api/agora/new-delivery",
          {
            delivery,
            message,
            deliveryKind,
            projectID,
            workbookID,
            queryID,
            userID,
            cohortID,
          },
          {
            headers: { Authorization: userID },
          }
        );
        showSuccessMsg(
          "Nueva entrega registrada",
          "La entrega se ha creado satisfactoriamente"
        );
        setDeliveryStudent({
          ...deliveryStudent,
          err: "",
          success: res.data.msg,
        });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setDeliveryStudent({
          ...deliveryStudent,
          err: err.response.data.msg,
          success: "",
        });
    }
    fetchDelivery(activityID, userID);
  };

  return (
    <>
      <div className={styles.formContainer}>
        <button className={styles.button_return} onClick={() => navigate(-1)}>
          <i className="ri-arrow-go-back-line"></i>
        </button>
        <div className={styles.InitialContainer}>
          <h2>{activityProject}</h2>
          <LazyLoad className={styles.img_preview}>
            <img src={image} alt="imageDelivery" />
          </LazyLoad>
        </div>
        <form className={styles.containerModal} onSubmit={handleSubmit}>
          <div className={styles.chat}>
            <div className={styles.segundoFondoestudiantes}>
              <h4>
                {" "}
                <b>Entregas</b>
              </h4>
              {modal.map((item, index) => (
                <div key={index}>
                  {
                    <p className={styles.textTime}>
                      <b>
                        {new Date(item.createdAt).toLocaleDateString("en-CA")}-{" "}
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </b>
                    </p>
                  }

                  <h5>Descripción:</h5>
                  <p>{item.message}</p>
                  <br />
                  <h5>Links:</h5>
                  <br />
                  {item.delivery.map((item) => (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.tag}
                    >
                      {item.nameLink}
                    </a>
                  ))}
                  <hr />
                </div>
              ))}
            </div>
            <div className={styles.segundoFondoestudiantes}>
              <h4>
                {" "}
                <b>Feedback</b>
              </h4>
              {modalStudent.map((item, index) => (
                <div key={index}>
                  {
                    <p className={styles.textTime}>
                      <b>
                        {new Date(item.createdAt).toLocaleDateString("en-CA")}-{" "}
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </b>
                    </p>
                  }

                  <h5>Descripción:</h5>
                  <p>{item.message}</p>
                  <br />
                  <h5>Links:</h5>
                  <br />
                  {item.feedback.map((item) => (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.tag}
                    >
                      {item.nameLink}
                    </a>
                  ))}
                  <hr />
                </div>
              ))}
            </div>
          </div>
          <h3>Ingrese la entrega y sus Links correspondientes</h3>
          <div className={styles.secondContainer}>
            <div className={styles.contInpLink}>
              <div className={styles.contInpLinkIntern}>
                <label>Nombre del Link</label>
                <input
                  type="text"
                  className={styles.inputLink}
                  placeholder="Nombre"
                  name="nameLink"
                  value={nameLink}
                  onChange={handleChangeLink}
                />
                <label>Dirección URL</label>
                <input
                  type="text"
                  className={styles.inputLink}
                  placeholder="Link de entrega"
                  name="link"
                  value={link}
                  onChange={handleChangeLink}
                />
              </div>

              <button
                className={styles.addTagsProject}
                type="button"
                onClick={() => onClickObject("delivery")}
              >
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
              </button>
            </div>
            <div className={styles.secondText}>
              <label>Mensaje para la Entrega</label>
              <div className={styles.inputDes}>
                <textarea
                  name="message"
                  value={message}
                  placeholder="Descripcion"
                  onChange={handleChangeInput}
                ></textarea>
              </div>
              <button type="submit">Enviar</button>
            </div>
          </div>

          <div className={styles.container__tagsModal}>
            {delivery.length !== 0
              ? delivery.map((item, index) => (
                  <div className={styles.tagContainer} key={index}>
                    <i className={`ri-link-m ${styles.linkIcon}`}></i>
                    <div className={styles.tagText}>
                      <a
                        className={styles.tag}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.nameLink}
                      </a>
                    </div>
                    <button
                      className={styles.deleteTag}
                      type="button"
                      onClick={() => deleteItemArray("delivery", item)}
                    >
                      <i className="ri-delete-bin-5-line"></i>
                    </button>
                  </div>
                ))
              : null}
          </div>
        </form>
      </div>
    </>
  );
}

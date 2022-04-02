import React, { useEffect, useState } from "react";
import styles from "./ModalEntrega.module.css";
import { VscError } from "react-icons/vsc";
import { BsArrowLeftCircle } from "react-icons/bs";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../api";
import { showErrMsg, showSuccessMsg } from "../../utils/notification";

const initialState = {
  message: "",
  feedback: [],
  success: "",
};

export function ModalDeliveryTeacher() {
  const auth = useSelector((state) => state.auth);
  const teacherID = auth.user.id;
  const params = useParams();
  const deliveryKind = params.kind;
  const activityID = params.id;
  const userID = params.user;

  let navigate = useNavigate();

  const [modal, setModal] = useState([]);
  const [modalTeacher, setModalTeacher] = useState([])
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
  }, [deliveryKind]);

  const fetchDelivery = async (activityid, id) => {
    const res = await apiAgora.get(`/api/agora/get-delivery/${id}`, {
      headers: { Authorization: teacherID },
    });
    const allDeliveryByStudent = res.data;
    const deliveryFilterByActivity = allDeliveryByStudent.map((item) =>
      item.projectID === activityid
        ? item
        : item.queryID === activityid
          ? item
          : item.workbookID === activityid
            ? item
            : null
    );
    const deliveries = deliveryFilterByActivity.filter((item) => item !== null);
    setModal(deliveries);
  };
  const fetchFeedbacks = async (activityid, id) => {
    const res = await apiAgora.get(`/api/agora/get-outcome/${id}`, {
      headers: { Authorization: teacherID },
    });
    const allFeedbacksByStudent = res.data;
    const feedbackFilterByActivity = allFeedbacksByStudent.map((item) =>
      item.projectID === activityid
        ? item
        : item.queryID === activityid
          ? item
          : item.workbookID === activityid
            ? item
            : null
    );
    const feedbacks = feedbackFilterByActivity.filter((item) => item !== null);
    setModalTeacher(feedbacks);
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
    fetchActivity(deliveryKind, activityID, teacherID);
  }, [activityID, userID]);

  const [deliveryStudent, setDeliveryStudent] = useState(initialState);

  const [objectLink, setObjectLink] = useState({
    nameLink: "",
    link: "",
  });

  const { feedback, message, projectID, success, workbookID, queryID } =
    deliveryStudent;

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
      if (auth.isTeacher) {
        const res = await apiAgora.post(
          "/api/agora/new-outcome",
          {
            feedback,
            message,
            deliveryKind,
            projectID,
            workbookID,
            queryID,
            userID,
          },
          {
            headers: { Authorization: teacherID },
          }
        );
        showSuccessMsg(success);
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
    fetchFeedbacks(activityID, userID)

  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.InitialContainer}>
        <button className={styles.button_return} onClick={() => navigate(-1)}>
          <BsArrowLeftCircle size={30} />
        </button>
        <div className={styles.InitialContainer}>
          <h2>{activityProject}</h2>
          <div className={styles.img_preview}>
            <img src={image} alt="imageDelivery" />
          </div>
        </div>
      </div>
      <form className={styles.containerModal} onSubmit={handleSubmit}>
        <div className={styles.chat}>
          <div className={styles.segundoFondoestudiantes}>
            <h4> <b>Entregas</b></h4>
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
            <h4> <b>Feedback</b></h4>
            {modalTeacher.map((item, index) => (
              <div key={index}>
                {
                  <p className={styles.textTime}>
                    <b>Fecha:</b>{" "}
                    {new Date(item.createdAt).toLocaleDateString("en-CA")}
                    <b>Hora:</b>
                    {new Date(item.createdAt).toLocaleTimeString()}
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
        <div className={styles.secondContainer}>
          <div className={styles.contInpLink}>
            <div className={styles.contInpLinkIntern}>
              <label>Nombre del Link</label>
              <input
                type="text"
                className={styles.inputLink}
                placeholder="nombre"
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
              onClick={() => onClickObject("feedback")}
            >
              <MdOutlineAddCircle size={30} />
            </button>
          </div>
          <div className={styles.secondText}>
            <label>Mensaje para el Feedback</label>
            <div className={styles.inputDes}>
              <textarea
                name="message"
                value={message}
                placeholder="Descripcion"
                onChange={handleChangeInput}
              ></textarea>
            </div>
            <button type="submit">enviar</button>
          </div>

        </div>

        <div className={styles.container__tagsModal}>
          {feedback.length !== 0
            ? feedback.map((item, index) => (
              <div className={styles.tagContainer} key={index}>
                <AiOutlineLink className={styles.linkIcon} size={30} />
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
                  <MdDeleteForever size={30} />
                </button>
              </div>
            ))
            : null}
        </div>
      </form>
    </div>
  );
}

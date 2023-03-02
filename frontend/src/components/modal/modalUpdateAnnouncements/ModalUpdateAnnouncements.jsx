import React, { useState, useEffect } from "react";
import style from "../ModalAnnouncements.module.css";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import apiAgora from "../../../api";

const initialState = {
  textAnnouncement: "",
  titleAnnouncement: "",
  success: "",
};

export function ModalUpdateAnnouncements(props) {
  const {
    setEditOpen,
    announcementID,
    userID,
    auth,
    setAnnouncements,
    cohortID,
  } = props;

  const [announcement, setAnnouncement] = useState(initialState);
  const { textAnnouncement, titleAnnouncement} = announcement;

  const fetchAnnouncements = async (url, id) => {
    const res = await apiAgora.get(`api/agora/get-announcements/${url}`, {
      headers: { Authorization: id },
    });
    setAnnouncements(res.data);
  };

  const fetchAnnouncement = async (url, id) => {
    const res = await apiAgora.get(`/api/agora/get-announcement/${url}`, {
      //announcement
      headers: { Authorization: id },
    });
    setAnnouncement(res.data);
  };

  useEffect(() => {
    fetchAnnouncement(announcementID, userID);
  }, [announcementID, userID]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAnnouncement({ ...announcement, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isTeacher) {
        const res = await apiAgora.put(
          `/api/agora/update-announcement/${announcementID}`,
          {
            userID,
            textAnnouncement,
            titleAnnouncement,
          },
          {
            headers: { Authorization: userID },
          }
        );
        showSuccessMsg("Anuncio Actualizado", "El Anuncio se ha actualizado satisfactoriamente");
        setAnnouncement({ ...announcement, err: "", success: res.data.msg });
      }
      setEditOpen((prevState) => !prevState);
      fetchAnnouncements(cohortID, userID);
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setAnnouncement({
          ...announcement,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.modal}>
      <div className={style.containerModal}>
        <div className={style.close}>
          <button onClick={() => setEditOpen((prevState) => !prevState)}>
            <i className="ri-close-circle-fill" style={{fontSize: '25px'}}></i>
          </button>
        </div>
        <div className={style.containerTitle}>
          <h3>
            <u>Modificar Anuncio</u>
          </h3>
        </div>
        <div className={style.modalInp}>
          <label>Título</label>
          <input
            type="text"
            name="titleAnnouncement"
            value={titleAnnouncement}
            placeholder="Titulo"
            onChange={handleChangeInput}
          />
          <label>Anuncio</label>
          <textarea
            cols="30"
            rows="10"
            name="textAnnouncement"
            value={textAnnouncement}
            placeholder="Comentario"
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className={style.Crear}>
          <button type="submit" className={style.submitButton}>
            Modificar
          </button>
        </div>
      </div>
    </form>
  );
}

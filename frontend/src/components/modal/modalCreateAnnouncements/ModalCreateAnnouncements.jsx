import React, { useState } from "react";
import style from "../ModalAnnouncements.module.css";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import { VscError } from "react-icons/vsc";
import apiAgora from "../../../api/index";

const initialState = {
  textAnnouncement: "",
  titleAnnouncement: "",
  success: "",
};

export function ModalCreateAnnouncements(props) {
  const { setModal, auth, cohortID, userID, setAnnouncements } = props;
  const [announcement, setAnnouncement] = useState(initialState);
  const { textAnnouncement, titleAnnouncement } = announcement;

  const fetchAnnouncements = async (url, id) => {
    const res = await apiAgora.get(`api/agora/get-announcements/${url}`, {
      headers: { Authorization: id },
    });
    setAnnouncements(res.data);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAnnouncement({ ...announcement, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isTeacher) {
        const res = await apiAgora.post(
          "/api/agora/new-announcement",
          {
            cohortID,
            userID,
            textAnnouncement,
            titleAnnouncement,
          },
          {
            headers: { Authorization: userID },
          }
        );
        showSuccessMsg("Nuevo Anuncio","Se ha creado satisfactoriamente el anuncio");
        setAnnouncement({ ...announcement, err: "", success: res.data.msg });
      }
      setModal((prevState) => !prevState);
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
          <button onClick={() => setModal((prevState) => !prevState)}>
            <VscError size={30} />
          </button>
        </div>
        <div className={style.containerTitle}>
          <h3>
            {" "}
            <u>Crear Anuncios</u>{" "}
          </h3>
        </div>
        <div className={style.modalInp}>
          <input
            type="text"
            name="titleAnnouncement"
            value={titleAnnouncement}
            placeholder="Titulo"
            onChange={handleChangeInput}
          />
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
            Crear
          </button>
        </div>
      </div>
    </form>
  );
}

import React, { useEffect, useState } from "react";
import { TitleSectionWithButton } from "../../components/titles/TitleSectionWitButton";
import { TitleSection } from "../../components/titles/TitleSection";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import apiAgora from "../../api";
import { ModalCreateAnnouncements } from "../../components/modalCreateAnnouncements/ModalCreateAnnouncements";
import style from "./announcement.module.css";

export const Announcements = () => {
  const auth = useSelector((state) => state.auth);
  const { isTeacher } = auth;
  const id_user = auth.user.id;
  const params = useParams();
  const cohortID = params.id;

  const [announcements, setAnnouncements] = useState([]);
  const [modal, setModal] = useState(false);

  const onClickModal = () =>{
    setModal(!modal)
  }

  const fetchAnnouncements = async () => {
    const res = await apiAgora.get(`/get-announcements/ ${cohortID}`, {
      headers: { Authorization: id_user },
    });
    setAnnouncements(res.data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <button onClick={ onClickModal}>Crear Anuncios</button>
      {modal ?  <div /* className={modal ? "style.modal_activate": "style.modal"} */>
        <ModalCreateAnnouncements setModal={setModal}/>
      </div>:null}
      
    </div>
  );
};

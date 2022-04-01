import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import apiAgora from "../../api";
import Swal from "sweetalert2";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { ModalCreateAnnouncements } from "../../components/modalCreateAnnouncements/ModalCreateAnnouncements";
import styles from "./announcement.module.css";

export const Announcements = () => {
  const auth = useSelector((state) => state.auth);
  const { isTeacher } = auth;
  const id_user = auth.user.id;
  const params = useParams();
  const cohortID = params.id;

  const [announcements, setAnnouncements] = useState([]);
  const [modal, setModal] = useState(false);

  const onClickModal = () => {
    setModal(!modal);
  };

  const fetchAnnouncements = async () => {
    const res = await apiAgora.get(`api/agora/get-announcements/${cohortID}`, {
      headers: { Authorization: id_user },
    });
    setAnnouncements(res.data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const alertErase = (idAnnouncement) => {
    Swal.fire({
      background: "#E5E5E5",
      title: "¿Desea eliminar este Anuncio?",
      text: "Este proceso no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC02",
      cancelButtonColor: "#010101",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAnnouncement(idAnnouncement);
        Swal.fire("Completado", "El anuncio ha sido eliminado", "success");
      }
    });
  };

  const deleteAnnouncement = async (idAnnouncement) => {
    if (id_user != null) {
      await apiAgora.delete("api/agora/delete-announcement/" + idAnnouncement, {
        headers: { Authorization: id_user },
      });
      fetchAnnouncements();
    }
  };
  console.log(announcements);
  return (
    <div className={styles.Announcements}>
      <h2>Anuncios</h2>
      {isTeacher ? (
        <div className={styles.containerButton}>
          <button className={styles.button} onClick={onClickModal}>
            Crear Anuncios
          </button>
        </div>
      ) : null}
      {modal ? (
        <div className={styles.modal}>
          <ModalCreateAnnouncements
            auth={auth}
            cohortID={cohortID}
            userID={id_user}
            setModal={setModal}
          />
        </div>
      ) : null}
      <div className={styles.containerAnnouncements}>
        {announcements.length !== 0
          ? announcements.map((item, index) => (
              <div className={styles.containerAnnouncement} key={index}>
                <div className={styles.containerText}>
                  <div>
                    <h4>{item.titleAnnouncement}</h4>
                  </div>
                  <div>
                    <p>{item.textAnnouncement}</p>
                  </div>
                </div>
                <div>
                <div className={styles.buttonsActions}>
                  <FiEdit size={20} />
                  <button
                    className={styles.button__delete}
                    onClick={() => alertErase(item.id)}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
                <p className={styles.createdAt}>{item.createdAt}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

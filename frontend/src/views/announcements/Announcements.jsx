import React, { useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import apiAgora from "../../api";
import Swal from "sweetalert2";
import { ModalCreateAnnouncements } from "../../components/modal/modalCreateAnnouncements/ModalCreateAnnouncements";
import { ModalUpdateAnnouncements } from "../../components/modal/modalUpdateAnnouncements/ModalUpdateAnnouncements";
import styles from "./Announcements.module.css";

export const Announcements = (props) => {
  const { teacher } = props;
  const auth = useSelector((state) => state.auth);
  const { isTeacher } = auth;
  const userID = auth.user.id;
  //const userID = '63e3e39d39cb1aea19895658'
  const params = useParams();
  const cohortID = teacher ? params.id : auth.user.cohortID;
  //const cohortID = '63e53ad6fb22742544b96f1f'
  const [announcements, setAnnouncements] = useState([]);
  const [modal, setModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editInfo, setEditInfo] = useState("");
  const onClickModal = () => {
    setModal(!modal);
  };

  const fetchAnnouncements = async (url, id) => {
    const res = await apiAgora.get(`api/agora/get-announcements/${url}`, {
      headers: { Authorization: id },
    });
    setAnnouncements(res.data);
  };

  useEffect(() => {
    fetchAnnouncements(cohortID, userID);
  }, [cohortID, userID]);

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
        fetchAnnouncements(cohortID, userID);
        Swal.fire("Completado", "El anuncio ha sido eliminado", "success");
      }
    });
  };

  const handleInfoUpdate = (id) => {
    setEditOpen(!editOpen);
    setEditInfo(id);
  };
  const deleteAnnouncement = async (announcementID) => {
    if (useImperativeHandle != null) {
      await apiAgora.delete("api/agora/delete-announcement/" + announcementID, {
        headers: { Authorization: userID },
      });
      fetchAnnouncements();
    }
  };
  return (
    <div className={styles.Announcements}>

      <h2 className={styles.titleBigAnnouncements}>Anuncios</h2>

      {isTeacher ? (
        <div className={styles.containerButtonCreate}>
          <button className={styles.button} onClick={onClickModal}>
            Crear Anuncio
          </button>
        </div>
      ) : null}
      {modal ? (
        <div className={styles.modal}>
          <ModalCreateAnnouncements
            auth={auth}
            cohortID={cohortID}
            userID={userID}
            setModal={setModal}
            setAnnouncements={setAnnouncements}
          />
        </div>
      ) : null}
      {editOpen ? (
        <div className={styles.modal}>
          <ModalUpdateAnnouncements
            announcementID={editInfo}
            setEditOpen={setEditOpen}
            userID={userID}
            auth={auth}
            setAnnouncements={setAnnouncements}
            cohortID={cohortID}
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
                <div className={styles.containerRight}>
                  <p className={styles.createdAt}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <div>
                    {teacher ? (
                      <div className={styles.containerButton}>
                        <button
                          className={styles.button__delete}
                          onClick={() => handleInfoUpdate(item.id)}
                        >
                          <i className="ri-edit-line"></i>
                        </button>

                        <button
                          className={styles.button__delete}
                          onClick={() => alertErase(item.id)}
                        >
                          <i className="ri-delete-bin-5-line"></i>
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

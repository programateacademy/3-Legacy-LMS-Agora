import React, { useEffect, useState } from "react";
import TitleSectionWithButton from "../../componentes/titles/TitleSectionWitButton";
import * as controllerAnnounce from "../../controllers/controllerAnnounce";
import TitleSection from "../../componentes/titles/TitleSection";
import { useSelector } from "react-redux";

export const Announcements = () => {
  const auth = useSelector((state) => state.auth);
  const { isTeacher, isAdmin } = auth;
  const [announce, setAnnounce] = useState([]);

  useEffect(() => {
    const listAnnounce = async () => {
      try {
        const res = await controllerAnnounce.listAnnounces();
        const data = await res.json();
        setAnnounce(data);
      } catch (error) {
        console.log(error);
      }
    };
    listAnnounce();
  }, []);

  const newdateFormat = (date) => {
    let newDate = new Date(date).toLocaleString();
    return newDate;
  };

  return (
    <>
    {isAdmin || isTeacher ?  (
      <TitleSectionWithButton
        name={"Anuncios"}
        btnName={"Crear anuncio"}
        url={"/crearAnuncio"}
      />
      ) : (
        <TitleSection name="CREAR ANUNCIO" />

      )}

      <div style={{ marginBottom: "100px" }}>
        {announce.map((el, i) => (
          <div key={i} className="announceContainer">
            <h5>{el.titleAnnouncement}</h5>
            <div className="textAnnouncementContainer">
              <p>{el.textAnnouncement}</p>
              <small>
                <b>{newdateFormat(el.updatedAt)}</b>
              </small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

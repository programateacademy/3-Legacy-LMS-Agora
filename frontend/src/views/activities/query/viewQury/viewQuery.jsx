import React, { useEffect, useState } from "react";
import style from "../../CreateActivity.module.css";
import apiAgora from "../../../../api/index";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../../../../components/Buttons/Button";
import LazyLoad from "react-lazy-load";

const initialState = {
  titleQuery: "",
  pictureQuery: "",
  descriptionQuery: "",
  tagsQuery: [],
  basicNotions: "",
  pathReq: [],
  documentationReq: [],
  importantAspect: "",
  resources: [],
  challengeTask: [],
  challengeExtra: "",
  date: "",
  err: "",
  success: "",
};

export function ViewQuery(props) {
  const { teacher } = props;
  const auth = useSelector((state) => state.auth);
  //const userID = auth.user.id;
  const userID = '63e3e39d39cb1aea19895658';
  let navigate = useNavigate();
  const params = useParams();
  //const queryID = params.id;
  const queryID ='63eaf0fc9be3c3a734cc7e84'
  const [image, setImage] = useState();

  const [query, setQuery] = useState(initialState);
  const {
    titleQuery,
    descriptionQuery,
    tagsQuery,
    basicNotions,
    pathReq,
    documentationReq,
    importantAspect,
    resources,
    challengeTask,
    challengeExtra,
    date,
  } = query;

  const fetchQuery = async (url, id) => {
    const res = await apiAgora.get("/api/agora/get-query/" + url, {
      headers: { Authorization: id },
    });
    if (res.data) {
      res.data.date =
        new Date(res.data.date).toLocaleDateString("en-CA") +
        "T" +
        new Date(res.data.date).toLocaleTimeString();
      setQuery(res.data);
      setImage(res.data.pictureQuery);
    }
  };

  useEffect(() => {
    fetchQuery(queryID, userID);
  }, [queryID, userID]);

  return (
    <div className={style.formContainer}>
      {/*CONTENEDOR GRANDE */}
      {/* BTN ATRAS */}
      <div>
        <button className={style.button_return} onClick={() => navigate(-1)}>
          <i className="ri-arrow-go-back-line"></i>
        </button>
      </div>
      {/*-----FIN ATRAS ----- */}
      {/* TIT CONSULTAS*/}
      <div className={style.wrapper}>
        <h2 className={`${style.typing_demo_view_Project} ${style.titlesGlobales}`}>Consulta</h2>
      </div>
      {/* ------ FIN TIT --------*/}

      {/* BTN ENTREGA */}
      {!teacher ? (
        <div className={style.buttonDelivery}>
          <Button
            title="Entregar consulta"
            link={`/delivery/query/${queryID}`}
          />
        </div>
      ) : null}
      {/* ---- FIN ---*/}

      <div>
        {/* CONTENEDOR ARRIBA */}
        <div className={style.container}>
          {/* CONTENEDOR IZQ*/}
          <div className={style.containerOne}>
            <div className={style.first}>
              {/* IMAGEN */}
              <LazyLoad className={style.img_preview}>
                <img className={style.image} src={image} alt="Consulta" />
              </LazyLoad>
              {/* ------------*/}

              {/* GENERAL*/}
              <div className={style.InitialContainer}>
                <h3>Nombre de la Consulta</h3>
                <h4>{titleQuery}</h4>
                <h3>Descripción de la Consulta</h3>
                <h4>{descriptionQuery}</h4>
                <h3>Etiquetas de la Consulta</h3>
                <div className={style.tagsList}>
                  {tagsQuery.length !== 0
                    ? tagsQuery.map((item, index) => (
                        <div className={style.tagContainer} key={index}>
                          <div className={style.tagText}>
                            <p className={style.tag}>{item}</p>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              {/* ------ FIN GENERAL ------*/}
              <div />
            </div>

            {/* DOCUMENTACION*/}
            <div className={style.summaryProject}>
              <h3>Documentación</h3>
              <div>
                {documentationReq.length !== 0
                  ? documentationReq.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tagText}>{item}</p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            {/*----- FIN DOCUMENTACION ----- */}

            {/* RECURSOS */}
            <div className={style.InitialContainer}>
              <h3>Recursos</h3>

              <div>
                {resources.length !== 0
                  ? resources.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <i className={`ri-link-m ${style.linkIcon}`}></i>
                        <div className={style.tagText}>
                          <a
                            className={style.tag}
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.nameLink}
                          </a>
                        </div>
                        <i className={`ri-link-m ${style.linkIcon}`}></i>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            {/*------ FIN RECURSOS ---- */}

            {/* NOCIONES*/}
            <div className={style.contextContainer}>
              <h3>Nociones básicas</h3>
              <h4>{basicNotions}</h4>
            </div>
            {/* -----------------*/}

            {/* REQUERIMIENTOS */}
            <div className={style.summaryProject}>
              <h3>Requerimientos</h3>
              <div>
                {pathReq.length !== 0
                  ? pathReq.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            {/* ------ FIN REQUERIMIENTOS ----- */}
          </div>
          {/*------- FIN IZQUIERDA ----- */}

          {/* CONTENEDOR DERECHA */}
          <div className={style.containerTwo}>
            {/* ASPECTOS */}
            <div className={style.summaryProject}>
              <h3>Aspectos Importantes</h3>
              <div className={style.tagsProject}>
                <h4>{importantAspect}</h4>
              </div>
            </div>
            {/*------ FIN ASPECTOS ------ */}

            {/* FECHA */}
            <div className={style.summaryProject}>
              <h3>Fecha y Hora de Entrega</h3>
              <div className={style.dateTimeDelivery}>
                <input
                  placeholder="Fecha de entrega"
                  type="datetime-local"
                  name="date"
                  value={date}
                />
              </div>
            </div>
            {/* ----------*/}

            {/* RETO */}
            <div className={style.summaryProject}>
              <h3>Reto</h3>
              <div>
                {challengeTask.length !== 0
                  ? challengeTask.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          {" "}
                          <p className={style.tag}>{item}</p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            {/* ----- FIN RETO ---- */}

            {/* RETO ADICIONAL*/}
            <div className={style.summaryProject}>
              <h3>Reto Adicional</h3>
              <div className={style.tagsProject}>
                <h4>{challengeExtra}</h4>
              </div>
            </div>
            {/*----- FIN ADICONAL ---- */}
          </div>
          {/*------- FIN DERECHA ----- */}
        </div>
        {/* FIN CONTENEDOR ARRIBA*/}
      </div>
      {/* -------FIN GRANDE------- */}
    </div>
  );
}

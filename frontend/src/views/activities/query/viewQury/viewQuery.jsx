import React, { useEffect, useState } from "react";
import style from "../../CreateActivity.module.css";

import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import apiAgora from "../../../../api/index";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../../../../components/buttons/Button/Button";
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
  const userID = auth.user.id;
  let navigate = useNavigate();
  const params = useParams();
  const queryID = params.id;
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
      <div>
        <button className={style.button_return} onClick={() => navigate(-1)}>
          <BsArrowLeftCircle size={30} />
        </button>
      </div>
      <div className={style.wrapper}>
        <h2 className={style.typing_demo_view_Project}>Consulta</h2>
      </div>
      {!teacher ? (
        <div className={style.buttonDelivery}>
          <Button
            title="Entregar consulta"
            link={`/delivery/query/${queryID}`}
          />
        </div>
      ) : null}

      <div>
        <div className={style.container}>
          <div className={style.containerOne}>
            <div>
              <div className={style.img_preview}>
                <img className={style.image} src={image} alt="Consulta" />
              </div>
            </div>
            <div className={style.frameofcompetence}></div>
            <div className={style.InitialContainer}>
              <h3>Recursos</h3>

              <div>
                {resources.length !== 0
                  ? resources.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <AiOutlineLink className={style.linkIcon} size={30} />
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
                        <AiOutlineLink className={style.linkIcon} size={30} />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className={style.containerTwo}>
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
            <div className={style.contextContainer}>
              <h3>Nociones básicas</h3>
              <h4>{basicNotions}</h4>
            </div>

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
        </div>
        <div className={style.line}></div>

        <div className={style.deliveryContainer}>
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
          <div className={style.summaryProject}>
            <h3>Documentación Requerida</h3>
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
          <div className={style.summaryProject}>
            <h3>Aspectos Importantes</h3>
            <div className={style.tagsProject}>
              <h4>{importantAspect}</h4>
            </div>
          </div>
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
          <div className={style.summaryProject}>
            <h3>Reto Adicional</h3>
            <div className={style.tagsProject}>
              <h4>{challengeExtra}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

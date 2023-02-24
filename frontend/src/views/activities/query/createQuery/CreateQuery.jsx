import React, { useState } from "react";
import style from "../../CreateActivity.module.css";
import { showErrMsg, showSuccessMsg } from "../../../../utils/notification";
import apiAgora from "../../../../api/index";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
export function CreateQuery() {
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  let navigate = useNavigate();
  const params = useParams();
  const cohortID = params.id;
  const [image, setImage] = useState();
  const [itemArray, setItemArray] = useState("");
  const [objectLink, setObjectLink] = useState({
    nameLink: "",
    link: "",
  });
  const [query, setQuery] = useState(initialState);
  const {
    titleQuery,
    pictureQuery,
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
  const { nameLink, link } = objectLink;
  //Image
  const handleImage = (e) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
      err: "",
      success: "",
    });
    setImage(value);
  };

  //general info project
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value, err: "", success: "" });
  };
  //add item
  const handleChangeArray = (e) => {
    setItemArray(e.target.value);
  };
  //
  const handleChangeLink = (e) => {
    const { name, value } = e.target;
    setObjectLink({
      ...objectLink,
      [name]: value,
      err: "",
      success: "",
    });
  };

  const onClickArray = (name) => {
    if (itemArray.trim()) {
      setQuery({
        ...query,
        [name]: [...query[name], itemArray],
        err: "",
        success: "",
      });
      setItemArray("");
    }
  };
  //
  const onClickObject = (name) => {
    if (objectLink.link.trim() && objectLink.nameLink.trim()) {
      setQuery({
        ...query,
        [name]: [...query[name], objectLink],
        err: "",
        success: "",
      });
    }
  };

  //delete item
  const deleteItemArray = (name, item) => {
    setQuery({
      ...query,
      [name]: query[name].filter((e) => e !== item),
    });
  };
  // Create new project
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isTeacher) {
        const res = await apiAgora.post(
          "/api/agora/new-query",
          {
            cohortID,
            userID,
            titleQuery,
            pictureQuery,
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
          },
          {
            headers: { Authorization: userID },
          }
        );
        showSuccessMsg("Nueva Consulta Creada","La consulta se ha creado satisfactoriamente");
        setQuery({ ...query, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setQuery({ ...query, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className={style.formContainer}>
       {/* Contenedor grande */}
       {/* Btn atras*/}
      <div>
        <button className={style.button_return} onClick={() => navigate(-1)}>
          <i className="ri-arrow-go-back-line"></i>
        </button>
      </div>
      {/* ---------- FIN ATRAS -------*/}
       {/*---------------------------------- */}
       {/* Titulos consultas */}
      <div className={style.wrapper}>
        <h2 className={`${style.typing_demo} ${style.titlesGlobales}`}>Crear Consulta</h2>
      </div>
       {/* ---------------------------------*/}
      <form onSubmit={handleSubmit}>
         {/* Contenedor superior */}
        <div className={style.container}>
         {/* Contenedor derecha */}
          <div className={style.containerOne}>
            <div>
               {/* Contenedor imagen */}
              <LazyLoad className={style.img_preview}>
                <img className={style.image} src={image} alt="Consulta" />
              </LazyLoad>
              <h3>Imagen de la Consulta</h3>
              <input
                className={style.input__imageURL}
                placeholder="Inserta URL de la imagen de la Consulta"
                type="text"
                name="pictureQuery"
                value={pictureQuery}
                onChange={handleImage}
              />
            </div>
            <div className={style.frameofcompetence}></div>
            
          </div>
           {/* Contenedor Derecha */}
          <div className={style.containerTwo}>
             {/* Contenedor GENERAL */}
            <div className={style.InitialContainer}>
              <h3>Nombre de la Consulta</h3>
              <input
                placeholder="Nombre de la consulta"
                type="text"
                name="titleQuery"
                value={titleQuery}
                onChange={handleChangeInput}
              />
              <h3>Descripción de la Consulta</h3>
              <textarea
                name="descriptionQuery"
                value={descriptionQuery}
                placeholder="Descripción"
                onChange={handleChangeInput}
              ></textarea>
              <h3>Etiquetas de la Consulta</h3>
              <div className={style.tagsProject}>
                <input
                  placeholder="Etiquetas consulta"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  className={style.addTagsProject}
                  type="button"
                  onClick={() => onClickArray("tagsQuery")}
                >
                  <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
                </button>
              </div>
              <div className={style.tagsList}>
                {tagsQuery.length !== 0
                  ? tagsQuery.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>
                        <button
                          className={style.deleteTag}
                          type="button"
                          onClick={() => deleteItemArray("tagsQuery", item)}
                        >
                          <i className="ri-delete-bin-5-line"></i>
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
             {/*------FIN GENERAL ----- */}

              {/* Contenedor Nociones */}
            <div className={style.contextContainer}>
              <h3>Nociones básicas</h3>
              <textarea
                placeholder="Descripción"
                name="basicNotions"
                value={basicNotions}
                onChange={handleChangeInput}
              ></textarea>
            </div>
             {/* ----FIN NOCIONES---- */}

             {/* Contenedor FECHA */}
            <h3>Fecha y Hora de Entrega</h3>
            <div className={style.dateTimeDelivery}>
              <input
                placeholder="Fecha de entrega"
                type="datetime-local"
                name="date"
                value={date}
                onChange={handleChangeInput}
              />
            </div>
             {/* ---- FIN FECHA---*/}
          </div>
            {/* ----FIN DERECHA---- */}
        </div>
           {/* ----FIN SUPERIOR----- */}

          {/* Contenedor ABAJO */}
        <div className={style.deliveryContainer}>
           {/* Contenedor Recursos */}
           <div className={style.InitialContainer}>
              <h3>Recursos</h3>
              <div className={style.addResourcesContainer}>
                <h5>Nombre de recurso</h5>
                <input
                  placeholder="Nombre del recurso"
                  type="text"
                  name="nameLink"
                  value={nameLink}
                  onChange={handleChangeLink}
                />
                <div className={style.tagsProject}>
                  <h5>Link de recurso</h5>
                  <input
                    placeholder="Link Recurso"
                    type="text"
                    name="link"
                    value={link}
                    onChange={handleChangeLink}
                  />
                  <button
                    className={style.addTagsProject}
                    type="button"
                    onClick={() => onClickObject("resources")}
                  >
                    <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
                  </button>
                </div>
              </div>
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
                        <button
                          className={style.deleteTag}
                          type="button"
                          onClick={() => deleteItemArray("resources", item)}
                        >
                          <i className="ri-delete-bin-5-line"></i>
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            {/* ------ FIN RECURSOS -------*/}
           {/* REQUERIMIENTOS */}
          <div className={style.summaryProject}>
            <h3>Requerimientos</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Requerimientos Consulta"
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("pathReq")}
              >
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
              </button>
            </div>
            <div>
              {pathReq.length !== 0
                ? pathReq.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>{item}</p>
                      </div>
                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() => deleteItemArray("pathReq", item)}
                      >
                        <i className="ri-delete-bin-5-line"></i>
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
           {/* ------FIN REQUERIMIENTOS------- */}

            {/* DOCUMENTACION */}
          <div className={style.summaryProject}>
            <h3>Documentación Requerida</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Documentación"
                type="text"
                onChange={handleChangeArray}
              />
              <button
                type="button"
                className={style.addTagsProject}
                onClick={() => onClickArray("documentationReq")}
              >
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
              </button>
            </div>
            <div>
              {documentationReq.length !== 0
                ? documentationReq.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tagText}>{item}</p>
                      </div>

                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() =>
                          deleteItemArray("documentationReq", item)
                        }
                      >
                        <i className="ri-delete-bin-5-line"></i>
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
           {/* -------FIN DOCUMENTACION------- */}

            {/* Aspectos Importantes */}
          <div className={style.summaryProject}>
            <h3>Aspectos Importantes</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Descripción"
                type="text"
                name="importantAspect"
                value={importantAspect}
                onChange={handleChangeInput}
              />
            </div>
          </div>
           {/* ------FIN ASPECTOS------ */}

            {/* Reto*/}
          <div className={style.summaryProject}>
            <h3>Reto</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Documentación"
                type="text"
                onChange={handleChangeArray}
              />
              <button
                className={style.addTagsProject}
                type="button"
                onClick={() => onClickArray("challengeTask")}
              >
                <i className="ri-add-circle-fill" style={{fontSize: '25px'}}></i>
              </button>
            </div>
            <div>
              {challengeTask.length !== 0
                ? challengeTask.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        {" "}
                        <p className={style.tag}>{item}</p>
                      </div>

                      <button
                        className={style.deleteTag}
                        type="button"
                        onClick={() => deleteItemArray("challengeTask", item)}
                      >
                        <i className="ri-delete-bin-5-line"></i>
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
           {/* --- FIN RETO----------- */}

            {/* Reto Adicional */}
          <div className={style.summaryProject}>
            <h3>Reto Adicional</h3>
            <div className={style.tagsProject}>
              <textarea
                placeholder="Documentación"
                type="text"
                name="challengeExtra"
                value={challengeExtra}
                onChange={handleChangeInput}
              />
            </div>
          </div>
            {/* ------FIN ADICIONAL--------- */}

             {/* Btn Añadir */}
          <div className={style.container_submit}>
            <button className={style.buttonCreateProject} type="submit">
              Añadir
            </button>
          </div>
           {/* ------FIN AÑADIR------ */}
        </div>
         {/* ----- FIN ABAJO ---- */}
      </form>
      {/* ---------- FIN GRANDE -------*/}
    </div>
  );
}
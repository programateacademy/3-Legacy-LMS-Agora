import React, { useState } from "react";
import style from "./CreateQuery.module.css";

import { BsArrowLeftCircle } from "react-icons/bs";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { showErrMsg, showSuccessMsg } from "../../../../utils/notification";
import apiAgora from "../../../../api";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
    success,
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
        showSuccessMsg(success);
        setQuery({ ...query, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setQuery({ ...query, err: err.response.data.msg, success: "" });
    }
  };

  console.log(resources);
  return (
    <div>
      <button className={style.button_return} onClick={() => navigate(-1)}>
        <BsArrowLeftCircle size={30} />
      </button>
      <form onSubmit={handleSubmit}>
        <div className={style.container}>
          <div className={style.containerOne}>
            <div>
              <div className={style.img_preview}>
                <img className={style.image} src={image} alt="Logo Cohorte" />
              </div>
              <div className={style.file}>
                <input
                  className={style.input__imageURL}
                  placeholder="Inserta URL de la imagen Bootcamp"
                  type="text"
                  name="pictureQuery"
                  value={pictureQuery}
                  onChange={handleImage}
                />
              </div>
            </div>
            <div>
              <h3>Documentación</h3>

              <input type="text" onChange={handleChangeInput} />
            </div>
            <div>
              <h3>Recursos</h3>
              <div>
                <input
                  placeholder="Nombre del recurso"
                  type="text"
                  name="nameLink"
                  value={nameLink}
                  onChange={handleChangeLink}
                />
                <input
                  placeholder="Link Recurso"
                  type="text"
                  name="link"
                  value={link}
                  onChange={handleChangeLink}
                />
                <button
                  type="button"
                  onClick={() => onClickObject("resources")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {resources.length !== 0
                  ? resources.map((item, index) => (
                      <div key={index}>
                        <a href={item.link} target="_blank">
                          {item.nameLink}
                        </a>
                        <button
                          type="button"
                          onClick={() => deleteItemArray("resources", item)}
                        >
                          <MdDeleteForever size={30} />
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div>
              <input
                placeholder="Fecha de entrega"
                type="datetime-local"
                name="date"
                value={date}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className={style.containerTwo}>
            <div>
              <input
                placeholder="Nombre de la consulta"
                type="text"
                name="titleQuery"
                value={titleQuery}
                onChange={handleChangeInput}
              />

              <textarea
                name="descriptionQuery"
                value={descriptionQuery}
                placeholder="Descripción"
                onChange={handleChangeInput}
              ></textarea>
              <div>
                <input
                  placeholder="Etiquetas consulta"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button type="button" onClick={() => onClickArray("tagsQuery")}>
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {tagsQuery.length !== 0
                  ? tagsQuery.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                        <button
                          type="button"
                          onClick={() => deleteItemArray("tagsQuery", item)}
                        >
                          <MdDeleteForever size={30} />
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div>
              <h3>Nociones básicas</h3>
              <textarea
                placeholder="Descripción"
                name="basicNotions"
                value={basicNotions}
                onChange={handleChangeInput}
              ></textarea>
            </div>
            <div>
              <h3>Requerimientos</h3>
              <div>
                <textarea
                  placeholder="Requerimientos Consulta"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button type="button" onClick={() => onClickArray("pathReq")}>
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {pathReq.length !== 0
                  ? pathReq.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                        <button
                          type="button"
                          onClick={() => deleteItemArray("pathReq", item)}
                        >
                          <MdDeleteForever size={30} />
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div>
              <h3>Documentación Requerida</h3>
              <div>
                <textarea
                  placeholder="Documentación"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  type="button"
                  onClick={() => onClickArray("documentationReq")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {documentationReq.length !== 0
                  ? documentationReq.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                        <button
                          type="button"
                          onClick={() =>
                            deleteItemArray("documentationReq", item)
                          }
                        >
                          <MdDeleteForever size={30} />
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div>
              <h3>Aspectos Importantes</h3>
              <div>
                <textarea
                  placeholder="Descripción"
                  type="text"
                  name="importantAspect"
                  value={importantAspect}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.line}></div>
        <div className={style.containerThree}>
          <div>
            <h3>Reto</h3>
            <div>
              <textarea
                placeholder="Documentación"
                type="text"
                onChange={handleChangeArray}
              />
              <button
                type="button"
                onClick={() => onClickArray("challengeTask")}
              >
                <MdOutlineAddCircle size={30} />
              </button>
            </div>
            <div>
              {challengeTask.length !== 0
                ? challengeTask.map((item, index) => (
                    <div key={index}>
                      <p>{item}</p>
                      <button
                        type="button"
                        onClick={() => deleteItemArray("challengeTask", item)}
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div>
            <h3>Reto Adicional</h3>
            <div>
              <textarea
                placeholder="Documentación"
                type="text"
                name="challengeExtra"
                value={challengeExtra}
                onChange={handleChangeInput}
              />
            </div>
          </div>
        </div>
        <div className={style.container_submit}>
          <button className={style.buttonCreateProject} type="submit">
            Añadir
          </button>
        </div>
      </form>
    </div>
  );
}

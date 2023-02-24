import React, { useState, useEffect } from "react";
import style from "../../CreateActivity.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../../api/index";
import { showErrMsg, showSuccessMsg } from "../../../../utils/notification";
import { Step } from "../step/Step";


import Swal from "sweetalert2";
import LazyLoad from "react-lazy-load";
const initWorkbook = {
  titleWorkbook: "",
  pictureWorkbook: "",
  descriptionWorkbook: "",
  tagsWorkbook: [],
  basicNotions: "",
  environmentalReq: [],
  contextReq: [],
  steps: [],
  challenge: "",
  resources: [],
  date: "",
};

const initStep = {
  descriptionStep: "",
  imageExampleStep: "",
  codeStep: "",
  imageResultStep: "",
  notesStep: "",
};
const initLink = { nameLink: "", link: "" };

export function UpdateWorkbook() {
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const params = useParams();
  const workbookID = params.id;
  let navigate = useNavigate();

  const [workbook, setWorkbook] = useState(initWorkbook);
  const [image, setImage] = useState("");
  const [itemArray, setItemArray] = useState("");
  const [objectLink, setObjectLink] = useState(initLink);
  const [step, setStep] = useState(initStep);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoStep, setInfoStep] = useState({ index: "", stepShow: "" });
  const {
    titleWorkbook,
    pictureWorkbook,
    descriptionWorkbook,
    tagsWorkbook,
    basicNotions,
    environmentalReq,
    contextReq,
    steps,
    challenge,
    resources,
    date,
  } = workbook;

  const {
    descriptionStep,
    imageExampleStep,
    codeStep,
    imageResultStep,
    notesStep,
  } = step;

  const fetchWorkbook = async (url, id) => {
    const res = await apiAgora.get("/api/agora/get-workbook/" + url, {
      headers: { Authorization: id },
    });
    if (res.data) {
      res.data.date =
        new Date(res.data.date).toLocaleDateString("en-CA") +
        "T" +
        new Date(res.data.date).toLocaleTimeString();
      setWorkbook(res.data);
      setImage(res.data.pictureWorkbook);
    }
  };

  useEffect(() => {
    fetchWorkbook(workbookID, userID);
  }, [workbookID, userID]);

  // Show complete step information
  const handleInfoStep = (index, stepShow) => {
    setOpenInfo(!openInfo);
    setInfoStep({ index: index, stepShow: stepShow });
  };

  //Image
  const handleImage = (e) => {
    const { name, value } = e.target;
    setWorkbook({
      ...workbook,
      [name]: value,
    });
    setImage(value);
  };
  //general info workbook
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setWorkbook({ ...workbook, [name]: value });
  };

  // Items within arrays
  const handleChangeArray = (e) => {
    setItemArray(e.target.value);
  };
  const onClickArray = (name) => {
    if (itemArray.trim()) {
      setWorkbook({
        ...workbook,
        [name]: [...workbook[name], itemArray],
      });
      setItemArray("");
    }
  };
  // Links
  const handleChangeLink = (e) => {
    const { name, value } = e.target;
    setObjectLink({
      ...objectLink,
      [name]: value,
    });
  };
  const onClickObject = (name) => {
    if (objectLink.link.trim() && objectLink.nameLink.trim()) {
      setWorkbook({
        ...workbook,
        [name]: [...workbook[name], objectLink],
      });
    }
  };
  // Steps
  const handleChangeStep = (e) => {
    const { name, value } = e.target;
    setStep({ ...step, [name]: value });
  };
  const onClickStep = (name) => {
    if (step.descriptionStep.trim() && step.imageResultStep.trim()) {
      setWorkbook({ ...workbook, [name]: [...workbook[name], step] });
      setStep(initStep);
    }
  };

  // Step images
  const handleImageStep = (e) => {
    const { name, value } = e.target;
    setStep({ ...step, [name]: value });
  };
  //delete item
  const deleteItemArray = (name, item) => {
    setWorkbook({
      ...workbook,
      [name]: workbook[name].filter((e) => e !== item),
    });
  };

  //save workbook info Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isTeacher) {
        const res = await apiAgora.put(
          `/api/agora/update-workbook/${workbookID}`,
          {
            userID,
            titleWorkbook,
            pictureWorkbook,
            descriptionWorkbook,
            tagsWorkbook,
            basicNotions,
            environmentalReq,
            contextReq,
            steps,
            challenge,
            resources,
            date,
          },
          {
            headers: { Authorization: userID },
          }
        );
        showSuccessMsg("Workbook Actualizado","Los cambios en el workbook se ha realizado satisfactoriamente");
        setWorkbook({ ...workbook, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setWorkbook({
          ...workbook,
          err: err.response.data.msg,
          success: "",
        });
    }
  };
  const alertDelete = (workbookID) => {
    Swal.fire({
      background: "#E5E5E5",
      title: "¿Desea eliminar este workbook?",
      text: "Este proceso no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC02",
      cancelButtonColor: "#010101",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteWorkbook(workbookID);
        Swal.fire("Completado", "El workbook ha sido eliminado", "success");
      }
    });
  };
  const deleteWorkbook = async (workbookID) => {
    await apiAgora.delete(`api/agora/delete-workbook/${workbookID}`, {
      headers: { Authorization: userID },
    });
    navigate(-1);
  };
  return (
    <>
      <div className={style.formContainer}>
        <div>
          <button className={style.button_return} onClick={() => navigate(-1)}>
            <i className="ri-arrow-go-back-line"></i>
          </button>
        </div>
        <div className={style.buttonDelivery}>
          <button
            type="button"
            className={style.button_clear}
            onClick={() => alertDelete(workbookID)}
          >
            Eliminar workbook
          </button>
        </div>
        <div className={style.wrapper}>
          <h2
            className={`${style.typing_demo_update_Workbook} ${style.titlesGlobales}`}
          >
            Actualizar Workbook
          </h2>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.container}>
            <div className={style.containerOne}>
              {/*     Image */}
              <div>
                <div>
                  <h3>Imagen del workbook</h3>
                  <input
                    className={style.input__imageURL}
                    placeholder="Inserta URL de la imagen del proyecto"
                    type="text"
                    name="pictureWorkbook"
                    value={pictureWorkbook}
                    onChange={handleImage}
                  />
                </div>
                <LazyLoad className={style.img_preview}>
                  <img
                    className={style.image}
                    src={image}
                    alt="Imagen del workbook"
                  />
                </LazyLoad>
              </div>
              {/* Resources */}

              <div className={style.InitialContainer}>
                <h3>Recursos</h3>
                <div className={style.addResourcesContainer}>
                  <h5>Nombre del recurso</h5>
                  <input
                    placeholder="Nombre del recurso"
                    type="text"
                    name="nameLink"
                    onChange={handleChangeLink}
                  />
                  <div className={style.tagsProject}>
                    <h5>Link de recurso</h5>
                    <input
                      placeholder="Link del Recurso"
                      type="text"
                      name="link"
                      onChange={handleChangeLink}
                    />
                    <button
                      className={style.addTagsProject}
                      type="button"
                      onClick={() => onClickObject("resources")}
                    >
                      <i
                        className="ri-add-circle-fill"
                        style={{ fontSize: "25px" }}
                      ></i>
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
                              rel="noreferrer"
                              target="_blank"
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
            </div>
            <div className={style.containerTwo}>
              {/* Name*/}
              <div className={style.InitialContainer}>
                <h3>Nombre del workbook</h3>
                <input
                  placeholder="Nombre del workbook"
                  type="text"
                  name="titleWorkbook"
                  value={titleWorkbook}
                  onChange={handleChangeInput}
                />
                {/* Description */}
                <h3>Descripción del proyecto</h3>
                <textarea
                  name="descriptionWorkbook"
                  value={descriptionWorkbook}
                  placeholder="Descripción"
                  onChange={handleChangeInput}
                ></textarea>
                {/* Tags */}
                <div>
                  <h3>Etiquetas del Workbook</h3>
                  <div className={style.tagsProject}>
                    <input
                      placeholder="Etiquetas workbook"
                      type="text"
                      onChange={handleChangeArray}
                    />
                    <button
                      className={style.addTagsProject}
                      type="button"
                      onClick={() => onClickArray("tagsWorkbook")}
                    >
                      <i
                        className="ri-add-circle-fill"
                        style={{ fontSize: "25px" }}
                      ></i>
                    </button>
                  </div>
                  <div>
                    {tagsWorkbook.length !== 0
                      ? tagsWorkbook.map((item, index) => (
                          <div className={style.tagContainer} key={index}>
                            <div className={style.tagText}>
                              <p className={style.tag}>{item}</p>
                            </div>
                            <button
                              className={style.deleteTag}
                              type="button"
                              onClick={() =>
                                deleteItemArray("tagsWorkbook", item)
                              }
                            >
                              <i className="ri-delete-bin-5-line"></i>
                            </button>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>

              {/* Basic Notions  */}
              <div className={style.contextContainer}>
                <h3>Nociones básicas</h3>
                <textarea
                  placeholder="Descripción"
                  name="basicNotions"
                  value={basicNotions}
                  onChange={handleChangeInput}
                ></textarea>
              </div>
              {/* Delivery date */}
              <div>
                <h3>Fecha y hora de entrega</h3>
                <div className={style.dateTimeDelivery}>
                  <input
                    placeholder="Fecha de entrega"
                    type="datetime-local"
                    name="date"
                    value={date}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={style.line}></div>
          {/*  Environmental requirements */}
          <div className={style.deliveryContainer}>
            <div className={style.summaryProject}>
              <h3>Entorno de desarrollo</h3>
              <div className={style.tagsProject}>
                <textarea
                  placeholder="Entorno de desarrollo"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  className={style.addTagsProject}
                  type="button"
                  onClick={() => onClickArray("environmentalReq")}
                >
                  <i
                    className="ri-add-circle-fill"
                    style={{ fontSize: "25px" }}
                  ></i>
                </button>
              </div>

              <div>
                {environmentalReq.length !== 0
                  ? environmentalReq.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>

                        <button
                          className={style.deleteTag}
                          type="button"
                          onClick={() =>
                            deleteItemArray("environmentalReq", item)
                          }
                        >
                          <i className="ri-delete-bin-5-line"></i>
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className={style.summaryProject}>
              <h3>Conceptos a investigar</h3>
              <div className={style.tagsProject}>
                <textarea
                  placeholder="Concepto"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  className={style.addTagsProject}
                  type="button"
                  onClick={() => onClickArray("contextReq")}
                >
                  <i
                    className="ri-add-circle-fill"
                    style={{ fontSize: "25px" }}
                  ></i>
                </button>
              </div>
              <div>
                {contextReq.length !== 0
                  ? contextReq.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <div className={style.tagText}>
                          <p className={style.tag}>{item}</p>
                        </div>
                        <button
                          className={style.deleteTag}
                          type="button"
                          onClick={() => deleteItemArray("contextReq", item)}
                        >
                          <i className="ri-delete-bin-5-line"></i>
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>

            {/* Steps */}
            <div className={style.summaryProject}>
              <h3>Pasos</h3>
              <div className={style.containerOne}>
                {/* Description */}
                <div>
                  <h4>Descripción del paso</h4>
                  <textarea
                    name="descriptionStep"
                    value={descriptionStep}
                    placeholder="Explicación"
                    onChange={handleChangeStep}
                  ></textarea>
                </div>
                {/*     Image Example*/}
                <div>
                  <h4>Imagen del paso</h4>
                  <div className={style.file}>
                    <input
                      className={style.input__imageURL}
                      placeholder="Inserta URL de la imagen"
                      type="text"
                      name="imageExampleStep"
                      value={imageExampleStep}
                      onChange={handleImageStep}
                    />
                  </div>
                  <LazyLoad className={style.img_preview}>
                    <img
                      className={style.image}
                      src={imageExampleStep}
                      alt="Imagen"
                    />
                  </LazyLoad>
                </div>
                {/* Code */}
                <div>
                  <h4>Código</h4>
                  <textarea
                    name="codeStep"
                    value={codeStep}
                    placeholder="Código"
                    onChange={handleChangeStep}
                  ></textarea>
                </div>
                {/*     Image expected result */}
                <div>
                  <h4>Resultado esperado</h4>
                  <div className={style.file}>
                    <input
                      className={style.input__imageURL}
                      placeholder="Inserta URL de la imagen"
                      type="text"
                      name="imageResultStep"
                      value={imageResultStep}
                      onChange={handleImageStep}
                    />
                  </div>
                  <LazyLoad className={style.img_preview}>
                    <img
                      className={style.image}
                      src={imageResultStep}
                      alt="Resultado esperado"
                    />
                  </LazyLoad>
                </div>
                {/* Notes */}
                <div>
                  <h4>Notas del formador</h4>
                  <textarea
                    name="notesStep"
                    value={notesStep}
                    placeholder="Notas"
                    onChange={handleChangeStep}
                  ></textarea>
                </div>
                <div className={style.container_submit}>
                  <button type="button" onClick={() => onClickStep("steps")}>
                    Agregar paso
                  </button>
                </div>
              </div>
            </div>
            {/*Show steps*/}
            <div className={style.summaryProject}>
              <h3>Pasos añadidos</h3>
              <div>
                {steps.length !== 0 ? (
                  steps.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>
                          <b>Paso número {index + 1}:</b> {item.descriptionStep}
                        </p>
                      </div>

                      <div className={style.buttonsStep}>
                        <button
                          className={style.deleteTag}
                          type="button"
                          onClick={() => deleteItemArray("steps", item)}
                        >
                          <i className="ri-delete-bin-5-line"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInfoStep(index, item)}
                        >
                          <i
                            className="ri-arrow-down-s-line"
                            style={{ fontSize: "25px" }}
                          ></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Aún no hay pasos añadidos</p>
                )}
              </div>
            </div>
            {/* If open info  is true, display information*/}
            {openInfo && steps.length !== 0 ? (
              <Step info={infoStep} setOpenInfo={setOpenInfo} />
            ) : (
              ""
            )}

            {/* Challenge */}
            <div className={style.summaryProject}>
              <h3>Reto</h3>
              <div className={style.tagsProject}>
                <textarea
                  name="challenge"
                  value={challenge}
                  placeholder="Reto"
                  onChange={handleChangeInput}
                ></textarea>
              </div>
            </div>
            <div>
              <div className={style.container_submit}>
                <button className={style.buttonCreateProject} type="submit">
                  Actualizar Workbook
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

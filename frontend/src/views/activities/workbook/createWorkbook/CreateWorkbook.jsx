import React, { useState, useEffect } from "react";
import style from "./CreateWorkbook.module.css";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../../api";
import { showErrMsg, showSuccessMsg } from "../../../../utils/notification";
import { StepUpdate } from "./stepUpdate/StepUpdate";
import { FiEdit } from "react-icons/fi";
const initialState = {
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

export function CreateWorkbook() {
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const params = useParams();
  const cohortID = params.id;
  let navigate = useNavigate();
  const [workbook, setWorkbook] = useState(initialState);
  const [image, setImage] = useState();
  const [itemArray, setItemArray] = useState("");
  const [objectLink, setObjectLink] = useState({
    nameLink: "",
    link: "",
  });
  const [step, setStep] = useState({
    identifier: "",
    descriptionStep: "",
    imageExampleStep: "",
    codeStep: "",
    imageResultStep: "",
    notesStep: "",
  });
  const [stepImages, setStepImages] = useState({
    imageExampleStep: "",
    imageResultStep: "",
  });
  const {
    descriptionStep,
    imageExampleStep,
    codeStep,
    imageResultStep,
    notesStep,
  } = step;

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
    success,
  } = workbook;

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
    setWorkbook({ ...workbook, [name]: [...workbook[name], step] });
  };
  // Step images
  const handleImageStep = (e) => {
    const { name, value } = e.target;
    setStep({ ...step, [name]: value });
    setStepImages({ ...step, [name]: value });
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
        const res = await apiAgora.post(
          "/api/agora/new-workbook",
          {
            cohortID,
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
        showSuccessMsg(success);
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

  /////////////
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ info: "", position: "" });
  const handleModal = (stepInfo, index) => {
    setOpenModal(!openModal);
    setModalInfo({ info: stepInfo, position: index });
  };
  ///////////

  return (
    <div className={style.formContainer}>
      <h2>Crear Workbook</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.container}>
          <div className={style.containerOne}>
            {/*     Image */}
            <div>
              <p>Visualice la imagen</p>
              <div className={style.img_preview}>
                <img className={style.image} src={image} alt="" />
              </div>
              <div className={style.file}>
                <input
                  className={style.input__imageURL}
                  placeholder="Inserta URL de la imagen del proyecto"
                  type="text"
                  name="pictureWorkbook"
                  value={pictureWorkbook}
                  onChange={handleImage}
                />
              </div>
            </div>
            {/* Resources */}
            <div>
              <h3>Recursos</h3>
              <div>
                <input
                  placeholder="Nombre del recurso"
                  type="text"
                  name="nameLink"
                  onChange={handleChangeLink}
                />
                <input
                  placeholder="Link del Recurso"
                  type="text"
                  name="link"
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
                        <a href={item.link} rel="noreferrer" target="_blank">
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
            {/* Delivery date */}
            <div>
              <h3>Fecha de entrega</h3>
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
            {/* Name*/}
            <div>
              <h3>Información workbook</h3>
              <input
                placeholder="Nombre del workbook"
                type="text"
                name="titleWorkbook"
                value={titleWorkbook}
                onChange={handleChangeInput}
              />
            </div>
            {/* Description */}
            <div>
              <textarea
                name="descriptionWorkbook"
                value={descriptionWorkbook}
                placeholder="Descripción"
                onChange={handleChangeInput}
              ></textarea>
            </div>
            {/* Tags */}
            <div>
              <div>
                <h3>Etiquetas</h3>
                <input
                  placeholder="Etiquetas workbook"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  type="button"
                  onClick={() => onClickArray("tagsWorkbook")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {tagsWorkbook.length !== 0
                  ? tagsWorkbook.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                        <button
                          type="button"
                          onClick={() => deleteItemArray("tagsProject", item)}
                        >
                          <MdDeleteForever size={30} />
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            {/* Basic Notions  */}
            <div>
              <h3>Nociones básicas</h3>
              <textarea
                placeholder="Descripción"
                name="basicNotions"
                value={basicNotions}
                onChange={handleChangeInput}
              ></textarea>
            </div>
            {/*  Environmental requirements */}
            <div>
              <h3>Entorno de desarrollo</h3>
              <div>
                <textarea
                  placeholder="Entorno de desarrollo"
                  type="text"
                  onChange={handleChangeArray}
                />
                <button
                  type="button"
                  onClick={() => onClickArray("environmentalReq")}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              <div>
                {environmentalReq.length !== 0
                  ? environmentalReq.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                        <button
                          type="button"
                          onClick={() =>
                            deleteItemArray("environmentalReq", item)
                          }
                        >
                          <MdDeleteForever size={30} />
                        </button>
                      </div>
                    ))
                  : null}
              </div>
              <div>
                <h3>Conceptos</h3>
                <div>
                  <textarea
                    placeholder="Concepto"
                    type="text"
                    onChange={handleChangeArray}
                  />
                  <button
                    type="button"
                    onClick={() => onClickArray("contextReq")}
                  >
                    <MdOutlineAddCircle size={30} />
                  </button>
                </div>
                <div>
                  {contextReq.length !== 0
                    ? contextReq.map((item, index) => (
                        <div key={index}>
                          <p>{item}</p>
                          <button
                            type="button"
                            onClick={() => deleteItemArray("contextReq", item)}
                          >
                            <MdDeleteForever size={30} />
                          </button>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Steps */}
        <h3>Pasos</h3>
        <div className={style.step}>
          {/* Description */}
          <div>
            <h3>Descripción</h3>
            <textarea
              name="descriptionStep"
              value={descriptionStep}
              placeholder="Explicación"
              onChange={handleChangeStep}
            ></textarea>
          </div>
          {/*     Image Example*/}
          <div>
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
            <div className={style.img_preview}>
              <img
                className={style.image}
                src={imageExampleStep}
                alt="Imagen"
              />
            </div>

            <p>Visualice la imagen</p>
          </div>
          {/* Code */}
          <div>
            <h3>Código</h3>
            <textarea
              name="codeStep"
              value={codeStep}
              placeholder="Código"
              onChange={handleChangeStep}
            ></textarea>
          </div>
          {/*     Image expected result */}
          <div>
            <h3>Resultado esperado</h3>
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
            <p>Visualice la imagen</p>
            <div className={style.img_preview}>
              <img
                className={style.image}
                src={imageResultStep}
                alt="Resultado esperado"
              />
            </div>
          </div>
          {/* Notes */}
          <div>
            <h3>Notas</h3>
            <textarea
              name="notesStep"
              value={notesStep}
              placeholder="Notas"
              onChange={handleChangeStep}
            ></textarea>
          </div>
          <div>
            <button type="button" onClick={() => onClickStep("steps")}>
              <MdOutlineAddCircle size={30} />
            </button>
          </div>
          {/*Show steps*/}
          <div>
            <h3>Pasos añadidos</h3>
            {steps.length !== 0
              ? steps.map((item, index) => (
                  <div key={index}>
                    <p>
                      Paso{index + 1}
                      {item.descriptionStep}
                    </p>
                    <div>
                      <button
                        type="button"
                        onClick={() => deleteItemArray("steps", item)}
                      >
                        <MdDeleteForever size={30} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleModal(item, index)}
                      >
                        <FiEdit size={30} />
                      </button>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* If the modal is shown, display the information*/}
        {openModal ? (
          <StepUpdate
            setOpenModal={setOpenModal}
            stepInfo={modalInfo}
            setStep={setStep}
            step={step}
            steps={steps}
            workbook={workbook}
            setWorkbook={setWorkbook}
          />
        ) : (
          ""
        )}

        {/* Challenge */}
        <div>
          <textarea
            name="challenge"
            value={challenge}
            placeholder="Reto"
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div>
          <button className={style.buttonCreateProject} type="submit">
            Crear Workbook
          </button>
        </div>
      </form>
    </div>
  );
}

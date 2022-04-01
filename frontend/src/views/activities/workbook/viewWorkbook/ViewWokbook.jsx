import React, { useState, useEffect } from "react";
import style from "../../CreateActivity.module.css";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../../api";
import { showErrMsg, showSuccessMsg } from "../../../../utils/notification";
import { Step } from "../../workbook/createWorkbook/step/Step";
import { MdExpandMore } from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";

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

export function ViewWorkbook() {
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
  const [stepImages, setStepImages] = useState({
    imageExampleStep: "",
    imageResultStep: "",
  });
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
    res.data.date =
      new Date(res.data.date).toLocaleDateString("en-CA") +
      "T" +
      new Date(res.data.date).toLocaleTimeString();
    setWorkbook(res.data);
    setImage(res.data.pictureWorkbook);
  };

  useEffect(() => {
    fetchWorkbook(workbookID, userID);
  }, [workbookID, userID]);

  // Show complete step information
  const handleInfoStep = (index, stepShow) => {
    setOpenInfo(!openInfo);
    setInfoStep({ index: index, stepShow: stepShow });
  };

  return (
    <div className={style.formContainer}>
      <div>
        <button className={style.button_return} onClick={() => navigate(-1)}>
          <BsArrowLeftCircle size={30} />
        </button>
      </div>
      <div className={style.wrapper}>
        <h2 className={style.typing_demo}>Workbook</h2>
      </div>
      <div className={style.form}>
        <div className={style.container}>
          <div className={style.containerOne}>
            {/*     Image */}
            <div>
              <div>
                <h3>Imagen del workbook</h3>>
                <div className={style.img_preview}>
                  <img
                    className={style.image}
                    src={image}
                    alt="Imagen del workbook"
                  />
                </div>
              </div>
              {/* Resources */}
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
                              rel="noreferrer"
                              target="_blank"
                            >
                              {item.nameLink}
                            </a>
                          </div>
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
                <h4>{titleWorkbook}</h4>
                {/* Description */}
                <h3>Descripción del proyecto</h3>
                <h4>{descriptionWorkbook}</h4>
                {/* Tags */}
                <h3>Etiquetas del Workbook</h3>
                <div className={style.tagsProject}></div>
                <div>
                  {tagsWorkbook.length !== 0
                    ? tagsWorkbook.map((item, index) => (
                        <div className={style.tagContainer} key={index}>
                          <div className={style.tagText}>
                            <p className={style.tag}>{item}</p>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>

            {/* Basic Notions  */}
            <div className={style.contextContainer}>
              <h3>Nociones básicas</h3>
              <p>{basicNotions}</p>
            </div>
            {/* Delivery date */}
            <h3>Fecha y hora de entrega</h3>
            <div className={style.dateTimeDelivery}>
              <input
                placeholder="Fecha de entrega"
                type="datetime-local"
                name="date"
                value={date}
                disabled
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
          <div>
            {environmentalReq.length !== 0
              ? environmentalReq.map((item, index) => (
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
          <h3>Conceptos a investigar</h3>
          <div>
            {contextReq.length !== 0
              ? contextReq.map((item, index) => (
                  <div className={style.tagContainer} key={index}>
                    <div className={style.tagText}>
                      <p className={style.tag}>{item}</p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* Steps */}
        <div className={style.summaryProject}>
          <h3>Pasos </h3>
          {steps.length !== 0 ? (
            steps.map((item, index) => (
              <div className={style.tagContainer} key={index}>
                <div className={style.tagText}>
                  <p className={style.tag}>
                    <b>Paso número {index + 1}:</b> {item.descriptionStep}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Aún no hay pasos añadidos</p>
          )}
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
            <p>{challenge}</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

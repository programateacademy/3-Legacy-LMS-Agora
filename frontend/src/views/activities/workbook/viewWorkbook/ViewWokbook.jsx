import React, { useState, useEffect } from "react";
import style from "../../CreateActivity.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../../api/index";
import { Step } from "../step/Step";

import { Button } from "../../../../components/Buttons/Button";
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

export function ViewWorkbook(props) {
  const { teacher } = props;
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const params = useParams();
  const workbookID = params.id;
  let navigate = useNavigate();

  const [workbook, setWorkbook] = useState(initWorkbook);
  const [image, setImage] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [infoStep, setInfoStep] = useState({ index: "", stepShow: "" });
  const {
    titleWorkbook,
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
  return (
    <div className={style.formContainer}>
      <div>
        <button className={style.button_return} onClick={() => navigate(-1)}>
          <i className="ri-arrow-go-back-line"></i>
        </button>
      </div>
      <div className={style.wrapper}>
        <h2
          className={`${style.typing_demo_view_Workbook} ${style.titlesGlobales}`}
        >
          Workbook
        </h2>
      </div>
      {!teacher ? (
        <div className={style.buttonDelivery}>
          <Button
            title="Entregar workbook"
            link={`/delivery/workbook/${workbookID}`}
          />
        </div>
      ) : null}

      <div className={style.form}>
        <div className={style.container}>
          <div className={style.containerOne}>
            {/*     Image */}
            <div>
              <LazyLoad className={style.img_preview}>
                <img
                  className={style.image}
                  src={image}
                  alt="Imagen del workbook"
                />
              </LazyLoad>
            </div>

            {/* Name*/}
            <div className={style.InitialContainer}>
              <h3 className={style.h3Workwook}>Nombre del workbook</h3>
              <h4 className={style.h4Workwook}>{titleWorkbook}</h4>
              {/* Description */}
              <h3 className={style.h3Workwook}>Descripción del proyecto</h3>
              <p className={style.pWorkwook}>{descriptionWorkbook}</p>
              {/* Tags */}
              <div>
                <h3 className={style.h3Workwook}>Etiquetas del Workbook</h3>
                <div className={style.tagsList}>
                  {tagsWorkbook.length !== 0
                    ? tagsWorkbook.map((item, index) => (
                        <div className={style.tagContainer} key={index}>
                          <p className={style.tag}>{item}</p>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className={style.res}>
              <div className={style.InitialContainer}>
                <h3 className={style.h3Workwook}>Recursos</h3>
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
                          <i className={`ri-link-m ${style.linkIcon}`}></i>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
            {/* Basic Notions  */}
            <div className={style.contextContainer}>
              <h3 className={style.h3Workwook}>Nociones básicas</h3>
              <p className={style.pWorkwook}>{basicNotions}</p>
            </div>
          </div>

          <div className={style.containerTwo}>
            <div className={style.ajus}>
              {/* Delivery date */}
              <div className={style.summaryProject}>
                <h3 className={style.h3Workwook}>Fecha y hora de entrega</h3>
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

              {/*Entorno*/}

              <div className={style.summaryProject}>
                <h3 className={style.h3Workwook}>Entorno de desarrollo</h3>
                <div className={(style.tagsList, style.concepts)}>
                  {environmentalReq.length !== 0
                    ? environmentalReq.map((item, index) => (
                        <div className={style.tagContainer} key={index}>
                          <p className={style.tag}>{item}</p>
                        </div>
                      ))
                    : null}
                </div>
              </div>

              {/*Conceptos */}
              <div className={style.summaryProject}>
                <h3 className={style.h3Workwook}>Conceptos a investigar</h3>
                <div className={style.concepts}>
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
            </div>
          </div>
        </div>

        {/*  Environmental requirements */}
        <div className={style.delivery}>
          {/*Show steps*/}
          <div className={style.summaryProject}>
            <h3 className={style.h3Workwook}>Pasos</h3>
            <div>
              {steps.length !== 0
                ? steps.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>
                          <b>Paso número {index + 1}:</b> {item.descriptionStep}
                        </p>
                      </div>

                      <div className={style.buttonsStep}>
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
                : null}
            </div>
          </div>

          {/* If open info  is true, display information*/}
          {openInfo && steps.length !== 0 ? (
            <div className={style.stepsContainer}>
              <Step info={infoStep} setOpenInfo={setOpenInfo} />
            </div>
          ) : (
            ""
          )}

          {/* Challenge */}
          <div className={style.summaryProject}>
            <h3 className={style.h3Workwook}>Reto</h3>
            <div className={style.tagsProject}>
              <p className={style.pWorkwook}>{challenge}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

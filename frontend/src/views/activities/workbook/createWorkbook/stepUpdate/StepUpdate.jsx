import React, { useState } from "react";
import style from "./StepUpdate.module.css";

export function StepUpdate(props) {
  const {
    setOpenModal,
    stepInfo,
    setStep,
    step,
    steps,
    workbook,
    setWorkbook,
  } = props;
  const { info, position } = stepInfo;
  const {
    descriptionStep,
    imageExampleStep,
    codeStep,
    imageResultStep,
    notesStep,
  } = info;
  // Steps
  const handleChangeStep = (e) => {
    const { name, value } = e.target;
    setStep({ ...step, [name]: value });
  };
  const onClickUpdateStep = () => {
    workbook.steps[position] = step;
  };

  // Step images
  const handleImageStep = (e) => {
    const { name, value } = e.target;
    setStep({ ...step, [name]: value });
  };

  return (
    <div className={style.step}>
      {stepInfo.position}
      <button
        className="close"
        onClick={() => setOpenModal((prevState) => !prevState)}
      >
        Cerrar
      </button>
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
          <img className={style.image} src={imageExampleStep} alt="Imagen" />
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
        <button type="button" onClick={() => onClickUpdateStep()}>
          Actualizar
        </button>
      </div>
    </div>
  );
}

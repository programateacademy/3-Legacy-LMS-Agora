import React, { useState } from "react";
import style from "./StepUpdate.module.css";

export function StepUpdate(props) {
  const { modalInfo, setOpenModal } = props;
  const { info, position } = modalInfo;
  const [stepUpdated, setStepUpdated] = useState({
    identifier: "",
    descriptionStep: "",
    imageExampleStep: "",
    codeStep: "",
    imageResultStep: "",
    notesStep: "",
    err: "",
    success: "",
  });

  const {
    descriptionStep,
    imageExampleStep,
    codeStep,
    imageResultStep,
    notesStep,
  } = stepUpdated;

  const [imageUpdate, setImageUpdate] = useState({
    imageExampleStep: "",
    imageResultStep: "",
  });

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setStepUpdated({ ...stepUpdated, [name]: value });
  };

  const handleImageUpdate = (e) => {
    const { name, value } = e.target;
    setStepUpdated({ ...stepUpdated, [name]: value });
    setImageUpdate({ ...stepUpdated, [name]: value });
  };


  return (
    <div className={style.modal}>
      <div className={style.containerModal}>
        <button
          className={style.close}
          onClick={() => setOpenModal((prevState) => !prevState)}
        >
          X
        </button>
        <div className={style.wrapper}>
          <h2 className={style.typing_demo}>Actualizar paso</h2>
        </div>
        posición en el arreglo {position}
        {/* Description */}
        <div>
          <h3>Descripción</h3>
          <textarea
            name="descriptionStep"
            value={info.descriptionStep}
            placeholder="Explicación"
            onChange={handleChangeUpdate}
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
              value={info.imageExampleStep}
              onChange={handleImageUpdate}
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
            value={info.codeStep}
            placeholder="Código"
            onChange={handleChangeUpdate}
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
              value={info.imageResultStep}
              onChange={handleImageUpdate}
            />
          </div>
          <p>Visualice la imagen</p>
          <div className={style.img_preview}>
            <img
              className={style.image}
              src={info.imageResultStep}
              alt="Resultado esperado"
            />
          </div>
        </div>
        {/* Notes */}
        <div>
          <h3>Notas</h3>
          <textarea
            name="notesStep"
            value={info.notesStep}
            placeholder="Notas"
            onChange={handleChangeUpdate}
          ></textarea>
        </div>
        <div>
          <button type="button" onClick={} >Actualizar</button>
        </div>
      </div>
    </div>
  );
}

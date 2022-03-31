import style from "./Step.module.css";
import { MdExpandLess } from "react-icons/md";
export function Step(props) {
  const { info, setOpenInfo } = props;
  const { index, stepShow } = info;

  const {
    descriptionStep,
    imageExampleStep,
    codeStep,
    imageResultStep,
    notesStep,
  } = stepShow;

  return (
    <div className={style.containerOne}>
      <div className={style.summaryProject}>
        <button
          className={style.addTagsProject}
          onClick={() => setOpenInfo((prevState) => !prevState)}
        >
          <MdExpandLess size={30} />
        </button>
        <div className={style.wrapper}>
          <h2 className={style.typing_demo}>Contenido paso {index + 1}</h2>
        </div>
        {/* Description */}
        <div>
          <h3>Descripción</h3>
          <p>{descriptionStep}</p>
        </div>
        {/*     Image Example*/}
        <div>
          <h3>Imagen de referencia</h3>
          <div className={style.img_preview}>
            <img className={style.image} src={imageExampleStep} alt="Imagen" />
          </div>
        </div>
        {/* Code */}
        <div>
          <h3>Código</h3>
          <p>{codeStep}</p>
        </div>
        {/*     Image expected result */}
        <div>
          <h3>Resultado esperado</h3>
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
          <p>{notesStep}</p>
        </div>
      </div>
    </div>
  );
}
